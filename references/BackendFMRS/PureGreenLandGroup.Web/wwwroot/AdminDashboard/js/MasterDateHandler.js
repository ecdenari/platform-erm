
$(document).ready(function () {

    //#region Datatables initialization
    InitializeDataTable('#ManufacturersTable', 25, [{ orderable: false, targets: [2] }]);
    InitializeDataTable('#ModelsTable', 25, [{ orderable: false, targets: [3] }]);
    InitializeDataTable('#PlantsTable', 25, [{ orderable: false, targets: [2] }]);
    InitializeDataTable('#SoilTypeTable', 25, [{ orderable: false, targets: [2] }]);
    InitializeDataTable('#SprinklerTable', 25, [{ orderable: false, targets: [2] }]);
    InitializeDataTable('#ValveSizeTable', 25, [{ orderable: false, targets: [2] }]);
    InitializeDataTable('#SeasonalAdjustListTable', 25, [{ orderable: false, targets: [2] }]);
    InitializeDataTable('#ZoneRuntimeListTable', 25, [{ orderable: false, targets: [2] }]);
    //#endregion Datatables initialization

    //create new manufacturer
    $('#ManufacturerForm').submit(function (event) {

        // Extract the form URL from the action attribute
        var formURL = $(this).attr('action');

        CreateUpdateMasterData(
            '#ManufacturerName_Validation',
            { name: 'ManufacturerName', input: '#manufacturerVM_ManufacturerName', IdInput: '#manufacturerVM_Id' },
            formURL,
            "Manufacturer created successfully",
            "Failed to create manufacturer!"
        );
    });

    $('#modelVM_ManufacturerId').change(function () {
        debugger
        var selectedValue = $(this).val();
        if (selectedValue > 0) {
            $('#ManufacturerId_Validation').text('');
            return true;
        }
        else {
            $('#ManufacturerId_Validation').text('Please select manufacturer!');
            return false;
        }
    });

    //create new model
    $('#ModelForm').submit(function (event) {
        debugger
        event.preventDefault();

        //validate the form for if the manufacturerid is selected or not
        var manufacturerIdInputValue = $('#modelVM_ManufacturerId').val();
        if (manufacturerIdInputValue > 0) {
            $('#ManufacturerId_Validation').text('');
        }
        else {
            $('#ManufacturerId_Validation').text('Please select manufacturer!');
            return false;
        }



        // Extract the form URL from the action attribute
        var formURL = $(this).attr('action');

        var modelNameValText = $('#ModelName_Validation').text();
        var manufacturerId = $('#ManufacturerId_Validation').text();
        var isModelNameValidInput = modelNameValText.trim() === '';
        var isManufacturerIdValidInput = manufacturerId.trim() === '';

        var id = $('#modelVM_Id').val();

        //check if inputs are valid
        if (isModelNameValidInput && isManufacturerIdValidInput) {
            var formData = {
                Id: id,
                ModelName: $('#modelVM_ModelName').val(),
                IsActive: true,
                ManufacturerId: $('#modelVM_ManufacturerId').val(),
            };

            AjaxRequest(formURL, "POST", formData)
                .done(function (response) {
                    if (response) {
                        $('.modal').modal('hide');
                        if (id > 0) {
                            swal({
                                title: "Modified",
                                text: 'Model updated successfully',
                                icon: "success",
                                timer: 1500,
                                buttons: false,
                            })
                                .then(() => {
                                    location.reload();
                                });
                        }
                        else {
                            swal({
                                title: "Created",
                                text: 'Model created successfully',
                                icon: "success",
                                timer: 1500,
                                buttons: false,
                            })
                                .then(() => {
                                    location.reload();
                                });
                        }

                    } else {
                        alert(errorMessage);
                    }
                })
                .fail(function (error) {
                    alert('An error occurred while processing the request.');
                });
        } else {
            return false;
        }
       
    });

    

    //create new plant type name
    $('#PlantTypeForm').submit(function (event) {
        // Extract the form URL from the action attribute
        var formURL = $(this).attr('action');

        CreateUpdateMasterData(
            '#PlantTypeName_Validation',
            { name: 'PlantTypeName', input: '#plantsTypeVM_PlantTypeName', IdInput: '#plantsTypeVM_Id' },
            formURL,
            "Plant type created successfully!",
            "Failed to create Plant type!"
        );
    });

    //create soil type
    $('#SoilTypeForm').submit(function (event) {
        // Extract the form URL from the action attribute
        var formURL = $(this).attr('action');

        CreateUpdateMasterData(
            '#SoilTypeName_Validation',
            { name: 'SoilTypeName', input: '#soilTypeVM_SoilTypeName', IdInput: '#soilTypeVM_Id' },
            formURL,
            "Soil type created successfully!",
            "Failed to create soil type!"
        );
    });

    //create sprinkler type
    $('#SprinklerTypeForm').submit(function (event) {
        // Extract the form URL from the action attribute
        var formURL = $(this).attr('action');

        CreateUpdateMasterData(
            '#SprinklerTypeName_Validation',
            { name: 'SprinklerTypeName', input: '#sprinklerTypeVM_SprinklerTypeName', IdInput: '#sprinklerTypeVM_Id' },
            formURL,
            "Sprinkler created successfully!",
            "Failed to create Sprinkler!"
        );
    });

    //create Valve Size 
    $('#ValveSizeForm').submit(function (event) {
        // Extract the form URL from the action attribute
        var formURL = $(this).attr('action');

        CreateUpdateMasterData(
            '#ValveSizeName_Validation',
            { name: 'ValveSizenames', input: '#valveSizeVM_ValveSizenames', IdInput: '#valveSizeVM_Id' },
            formURL,
            "Valve Size created successfully!",
            "Failed to create Valve Size!"
        );
    });

    //create Seasonal Adjust value
    $('#SeasonalAdjustForm').submit(function (event) {
        // Extract the form URL from the action attribute
        var formURL = $(this).attr('action');

        CreateUpdateMasterData(
            '#SeasonalAdjustName_Validation',
            { name: 'Value', input: '#seasonalAdjustDropdownVM_Value', IdInput: '#seasonalAdjustDropdownVM_Id' },
            formURL,
            "Seasonal Adjust Month value created successfully!",
            "Failed to create Seasonal Adjust Month value!"
        );
    });

    //create zone runtime value 
    $('#ZoneRuntimeForm').submit(function (event) {
        // Extract the form URL from the action attribute
        var formURL = $(this).attr('action');

        CreateUpdateMasterData(
            '#ZoneRuntime_Validation',
            { name: 'Value', input: '#programRunTimeVM_Value', IdInput: '#programRunTimeVM_Id' },
            formURL,
            "Zone Runtime created successfully!",
            "Failed to create Zone Runtime!"
        );
    });


});


//Generic function to initialize datatable
function InitializeDataTable(tableId, pageLength, columnDefs) {
    $(tableId).DataTable({
        pageLength: pageLength, // Set default page record dynamically
        columnDefs: columnDefs, // Set column definitions dynamically
        drawCallback: function (settings) {
            var api = this.api();
            var pageInfo = api.page.info();

            // Check if there are no records
            if (pageInfo.recordsDisplay === 0) {
                // Disable both Previous and Next buttons
                $('.dataTables_paginate .paginate_button').addClass('disabled');
            }
        }
    });
}

//generic method to create master data
function CreateUpdateMasterData(validationId, inputFieldIds, apiUrl, successMessage, errorMessage) {

    event.preventDefault();
    var validationText = $(validationId).text();
    var isValidInput = validationText.trim() === '';
    var id = $(inputFieldIds.IdInput).val();

    if (isValidInput) {
        var formData = {
            Id: id,
            [inputFieldIds.name]: $(inputFieldIds.input).val(),
            IsActive: true
        };

        AjaxRequest(apiUrl, "POST", formData)
            .done(function (response) {
                if (response) {
                    $('.modal').modal('hide');
                    if (id > 0) {
                        swal({
                            title: "Modified",
                            text: successMessage.replace("created", "updated"),
                            icon: "success",
                            timer: 1500,
                            buttons: false,
                        })
                            .then(() => {
                                location.reload();
                            });
                    }
                    else {
                        swal({
                            title: "Created",
                            text: successMessage,
                            icon: "success",
                            timer: 1500,
                            buttons: false,
                        })
                            .then(() => {
                                location.reload();
                            });
                    }

                } else {
                    alert(errorMessage);
                }
            })
            .fail(function (error) {
                alert('An error occurred while processing the request.');
            });
    } else {
        return false;
    }
}

function PopulateMasterEntityDetail(requestUrl, entityIdSelecter, entityNameSelecter, entityRelationId) {

    var headerText = $('.modal .modal-title').text();
    $('.modal .modal-footer .btn').text("UPDATE");
    $('.modal .modal-title').text(headerText.replace("Create New", "Update"));
    // Clear validation messege initially if there
    $('.modal .validation-font').text('');

    AjaxRequest(requestUrl, "GET")
        .done(function (response) {
            if (response) {
                debugger
                $(`#${entityIdSelecter}`).val(response[0]);
                $(`#${entityNameSelecter}`).val(response[1]);
                $(`#${entityRelationId}`).val(response[3]);
                $('.modal').modal('show')
            } else {
                alert(errorMessage);
            }
        })
        .fail(function (error) {
            alert('An error occurred while processing the request.');
        });
}

//open create new master data popup
//its sets the popup inputs/headers/validations to create new entry
function OpenMasterDataPopup() {
    var headerText = $('.modal .modal-title').text();
    $('.modal .modal-footer .btn').text("SUBMIT");
    $('.modal .modal-title').text(headerText.replace("Update", "Create New"));
    // Clear input values dynamically
    $('.modal input').val('');
    // Clear validation messege initially if there
    $('.modal .validation-font').text('');
    $('.modal').modal('show');
}
function CloseMasterDataPopups() {
    // Clear input values dynamically
    $('.modal input').val('');
    // Clear validation messege initially if there
    $('.modal .validation-font').text('');
}

// Define entity type display names
const entityTypeDisplayNames = {
    manufacturer: "Manufacturer",
    model: "Model",
    plant_type: "Plant Type",
    soil_type: "Soil Type",
    sprinkler: "Sprinkler",
    seasonal_adjust_month: "Seasonal Adjust Month",
    valve_size: "Valve Size",
    program_runtime: "Program Runtime"
};

function ChangeMasterDataStatusConfirmation(id, action, masterEntityType) {

    // Get the display name for the given masterEntityType
    const entityTypeDisplayName = entityTypeDisplayNames[masterEntityType] || "Entity";


    switch (action.toLowerCase()) {
        case 'false':
            swal({
                title: `Deactivate ${entityTypeDisplayName}`,
                text: `Are you sure you want to deactivate this ${entityTypeDisplayName.toLowerCase()}?`,
                icon: "warning",
                buttons: {
                    cancel: {
                        text: "No",
                        visible: true,
                    },
                    confirm: {
                        text: "Yes",
                    },
                },
                dangerMode: false,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        ChangeMasterDataStatusRequest(id, action, masterEntityType);
                    }
                    else {
                        location.reload();
                    }
                });
            break;
        case 'true':
            swal({
                title: `Activate ${entityTypeDisplayName}`,
                text: `Are you sure you want to activate this ${entityTypeDisplayName.toLowerCase()}?`,
                icon: "warning",
                buttons: {
                    cancel: {
                        text: "No",
                        visible: true,
                        class: 'btn-danger',
                    },
                    confirm: {
                        text: "Yes",
                    },
                    
                },
                dangerMode: false,
            })
                .then((willDelete) => {

                    if (willDelete) {
                        ChangeMasterDataStatusRequest(id, action, masterEntityType);
                    }
                    else {
                        location.reload();
                    }
                });
            break;
        default: break;
    }
}

function ChangeMasterDataStatusRequest(id, action, entityType) {
    const entityTypeDisplayName = entityTypeDisplayNames[entityType] || "Entity";

    PostRequest('/MasterDataManager/ChangeMasterEntityStatus', { id: id, status: action, masterEntityType: entityType })
        .then(function (response) {
            if (response.error) {
                swal("Error", serverErrorMsg, "error");
            } else {
                if (response) {
                    if (action == "true") {
                        swal({
                            title: "Success",
                            text: `${entityTypeDisplayName} activated successfully!`,
                            icon: "success",
                            timer: 1500,
                            buttons: false,
                        })
                            .then(() => {
                                location.reload();
                            })
                    }
                    else {
                        swal({
                            title: "Success",
                            text: `${entityTypeDisplayName} deactivated successfully!`,
                            icon: "success",
                            timer: 1500,
                            buttons: false,
                        })
                            .then(() => {
                                location.reload();
                            })
                    }
                }
            }
        });

}


//#region ADMIN DASHBOARD begins

function FilterMonthlyInspectionBarGraph(event) {
    
    // Get the selected year from the dropdown
    const selectedYear = event.target.value;
    AjaxRequest(`/account/FilterMonthlyInspectionGraph?year=${selectedYear}&isCompleted=true`, "GET")
        .done(function (response) {
            
            // Split the response into an array of data points
            const data = response.split(',');

            // Re-initialize the chart with the new data
            chart1.updateSeries([{
                name: 'Completed',
                data: data,
                color: '#0F572E'
            }]);
        })
        .fail(function (error) {
            alert('No data available!');
        });
}

//#endregion ADMIN DASHBOARD ENDS
