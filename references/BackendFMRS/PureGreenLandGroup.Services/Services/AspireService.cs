using PureGreenLandGroup.Models.DTO.Authentication;
using PureGreenLandGroup.Models.DTO.Properties;
using PureGreenLandGroup.Models.DTO.Branches;
using PureGreenLandGroup.Models.DTO.PropertyStatuses;
using PureGreenLandGroup.Models.DTO.PropertyTypes;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Domain.Interfaces;
using PureGreenLandGroup.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System.Net.Http.Headers;
using System.Data.OleDb;
using Newtonsoft.Json;
using System.Data;
using System.Text;
using AutoMapper;

namespace PureGreenLandGroup.Services.Services
{
    public class AspireService : IAspireService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AspireService(IConfiguration configuration, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _configuration = configuration;
            _httpClient = new HttpClient();
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        /// <summary>
        /// To get API auth token for third party API (Your aspire)
        /// </summary>
        /// <returns></returns>
        public async Task<AspireToken> GetAspireAPIToken()
        {
            string clientId = _configuration.GetSection("YourAspire_Credentials")["ClientId"]!.ToString();
            string secret = _configuration.GetSection("YourAspire_Credentials")["Secret"]!.ToString();
            string authUrl = _configuration.GetSection("YourAspire_API_Url")["Authentication"]!.ToString();

            var authRequest = new
            {
                ClientId = clientId,
                Secret = secret
            };

            var jsonContent = JsonConvert.SerializeObject(authRequest);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(authUrl, content);

            if (response.IsSuccessStatusCode)
            {
                string responseResult = await response.Content.ReadAsStringAsync();
                AspireToken aspireToken = JsonConvert.DeserializeObject<AspireToken>(responseResult);
                return aspireToken;
            }

            else
            {
                return new AspireToken();
            }
        }

        /// <summary>
        /// import users in our database
        /// </summary>
        /// <param name="usersFile"></param>
        /// <returns></returns>
        public async Task<string> SaveApplicationUser(IFormFile usersFile)
        {
            try
            {
                string response = string.Empty;
                if (usersFile == null)
                {
                    return response;
                }

                var filename = Path.GetFileName(usersFile.FileName);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), "UsersUploads");

                // Create directory "Uploads" if it doesn't exist
                if (!Directory.Exists(pathToSave))
                {
                    Directory.CreateDirectory(pathToSave);
                }

                // Get file path top copy in application
                var filePath = Path.Combine(pathToSave, usersFile.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await usersFile.CopyToAsync(stream);
                }

                // Get extension
                string extension = Path.GetExtension(filename);
                string fileFormat = string.Empty;

                switch (extension)
                {
                    case ".xls": // Excel 97-03
                        fileFormat = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + filePath + ";Extended Properties='Excel 8.0;HDR=YES'";
                        break;
                    case ".xlsx": // Excel 07 and above
                        fileFormat = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + filePath + ";Extended Properties='Excel 8.0;HDR=YES'";
                        break;
                }

                DataTable usersFileDataTable = new DataTable();
                fileFormat = string.Format(fileFormat, filePath);

                using (OleDbConnection connExcel = new(fileFormat))
                {
                    using (OleDbCommand cmdExcel = new())
                    {
                        using (OleDbDataAdapter odaExcel = new())
                        {
                            cmdExcel.Connection = connExcel;

                            // Get the name of the first sheet
                            connExcel.Open();
                            DataTable dtExcelSchema;
                            dtExcelSchema = connExcel.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                            string sheetName = dtExcelSchema.Rows[0]["TABLE_NAME"].ToString();
                            connExcel.Close();

                            // Read data from the first sheet
                            connExcel.Open();
                            cmdExcel.CommandText = "SELECT * From [" + sheetName + "]";
                            odaExcel.SelectCommand = cmdExcel;
                            odaExcel.Fill(usersFileDataTable);
                            connExcel.Close();
                        }
                    }

                    //add passowrd and user role
                    // Add the new columns to the DataTable
                    usersFileDataTable.Columns.Add("Password");
                    usersFileDataTable.Columns.Add("UserRole");

                    // Loop through all the rows in the DataTable
                    foreach (DataRow row in usersFileDataTable.Rows)
                    {
                        // Set the same password for all rows
                        row["Password"] = "Puregreen@123";
                        // Set the same user role for all rows
                        if (row["Email"].ToString().ToLower() == "evan@puregreenlandgroup.com")
                        {
                            row["UserRole"] = "Admin";
                        }
                        else
                        {
                            row["UserRole"] = "Technician";
                        }
                    }

                    // Your database connection string
                    string dbConnection = _configuration.GetConnectionString("DefaultConnection");
                    using (SqlConnection sqlConnection = new(dbConnection))
                    {
                        using (SqlBulkCopy sqlBulkCopy = new(sqlConnection))
                        {
                            // Set the destination table name
                            sqlBulkCopy.DestinationTableName = "[dbo].[MstUsers]";

                            // Map the Excel columns with that of the database table, this is optional but good if you do
                            sqlBulkCopy.ColumnMappings.Add("FirstName", "FirstName");
                            sqlBulkCopy.ColumnMappings.Add("LastName", "LastName");
                            sqlBulkCopy.ColumnMappings.Add("CompanyName", "CompanyName");
                            sqlBulkCopy.ColumnMappings.Add("Email", "Email");
                            sqlBulkCopy.ColumnMappings.Add("PrimaryPhone", "PrimaryPhone");
                            sqlBulkCopy.ColumnMappings.Add("MobilePhone", "MobilePhone");
                            sqlBulkCopy.ColumnMappings.Add("Active", "Active");
                            sqlBulkCopy.ColumnMappings.Add("ContactTagList", "ContactTagList");
                            sqlBulkCopy.ColumnMappings.Add("ContactType", "ContactType");
                            sqlBulkCopy.ColumnMappings.Add("CreatedByUser", "CreatedByUser");
                            sqlBulkCopy.ColumnMappings.Add("CreatedDate", "CreatedDate");
                            sqlBulkCopy.ColumnMappings.Add("EmployeeNumber", "EmployeeNumber");
                            sqlBulkCopy.ColumnMappings.Add("Title", "Title");
                            sqlBulkCopy.ColumnMappings.Add("Password", "Password");
                            sqlBulkCopy.ColumnMappings.Add("UserRole", "UserRole");

                            sqlConnection.Open();
                            await sqlBulkCopy.WriteToServerAsync(usersFileDataTable);
                            sqlConnection.Close();
                            response = "success";
                        }
                    }
                }

                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// fetch properties data from aspire api and save in db
        /// </summary>
        /// <returns></returns>
        public async Task<string> SaveProperties()
        {
            string actionResult = string.Empty;
            string propertiesURL = _configuration.GetSection("YourAspire_API_Url")["Fetch_Properties"]!.ToString();

            try
            {
                AspireToken aspireToken = await this.GetAspireAPIToken();
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", aspireToken.Token);


                // Create and send the HTTP request, and handle the response
                using (var apiResponse = await _httpClient.GetAsync(propertiesURL))
                {
                    // Check if request was successful
                    if (apiResponse.IsSuccessStatusCode)
                    {
                        // Read and parse the response content
                        string responseContent = await apiResponse.Content.ReadAsStringAsync();
                        var properties = JsonConvert.DeserializeObject<List<PropertiesMasterVM>>(responseContent);

                        var propRepository = _unitOfWork.GetRepository<Properties>();
                        var propContactRepository = _unitOfWork.GetRepository<PropertiesContact>();

                        //save properties in database
                        foreach (var property in properties)
                        {
                            var PropertyRecord = _mapper.Map<Properties>(property);
                            propRepository.Add(PropertyRecord);

                            if (property.PropertyContacts.Count > 0)
                            {
                                foreach (var contact in property.PropertyContacts)
                                {
                                    PropertiesContact propertiesContact = _mapper.Map<PropertiesContact>(contact);
                                    propContactRepository.Add(propertiesContact);
                                }
                            }
                        }
                        await _unitOfWork.CommitAsync();
                        actionResult = "success";
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }

            return actionResult;
        }

        /// <summary>
        /// fetch branches data from aspire api and save in db
        /// </summary>
        /// <returns></returns>
        public async Task<string> SaveBranches()
        {
            string actionResult = string.Empty;
            string branchesURL = _configuration.GetSection("YourAspire_API_Url")["Fetch_Branches"]!.ToString();

            try
            {
                AspireToken aspireToken = await this.GetAspireAPIToken();
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", aspireToken.Token);

                using (var apiResponse = await _httpClient.GetAsync(branchesURL))
                {
                    if (apiResponse.IsSuccessStatusCode)
                    {
                        string responseContent = await apiResponse.Content.ReadAsStringAsync();
                        var branches = JsonConvert.DeserializeObject<List<BranchVM>>(responseContent);

                        var branchRepository = _unitOfWork.GetRepository<Branch>();

                        foreach (var branch in branches)
                        {
                            var branchRecord = _mapper.Map<Branch>(branch);
                            branchRepository.Add(branchRecord);
                        }
                        await _unitOfWork.CommitAsync();
                        actionResult = "success";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }

            return actionResult;
        }

        /// <summary>
        /// fetch property statuses data from aspire api and save in db
        /// </summary>
        /// <returns></returns>
        // public async Task<string> SavePropertyStatuses()
        // string propertyStatusesURL = _configuration.GetSection("YourAspire_API_Url")["Fetch_PropertyStatuses"]!.ToString();
        // using (var apiResponse = await _httpClient.GetAsync(propertyStatusesURL))
        // var propertyStatuses = JsonConvert.DeserializeObject<List<PropertyStatusVM>>(responseContent);
        // foreach (var propertyStatus in propertyStatuses)

        /// <summary>
        /// fetch property types data from aspire api and save in db
        /// </summary>
        /// <returns></returns>
        // public async Task<string> SavePropertyTypes()
        // string propertyTypesURL = _configuration.GetSection("YourAspire_API_Url")["Fetch_PropertyTypes"]!.ToString();
        // using (var apiResponse = await _httpClient.GetAsync(propertyTypesURL))
        // var propertyTypes = JsonConvert.DeserializeObject<List<PropertyTypeVM>>(responseContent);
        // foreach (var propertyType in propertyTypes)
    }
}
