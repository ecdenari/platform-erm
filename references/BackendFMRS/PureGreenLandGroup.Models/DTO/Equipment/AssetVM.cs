using Newtonsoft.Json;

namespace PureGreenLandGroup.Models.DTO.Equipment
{
    public class AssetVM
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("barcode")]
        public string Barcode { get; set; }

        [JsonProperty("criticalityId")]
        public int CriticalityId { get; set; }

        [JsonProperty("parentId")]
        public int ParentId { get; set; }

        [JsonProperty("locationId")]
        public int LocationId { get; set; }

        [JsonProperty("teamIds")]
        public List<int> TeamIds { get; set; }

        [JsonProperty("assetTypes")]
        public List<string> AssetTypes { get; set; }

        [JsonProperty("extraFields")]
        public EqpExtraFieldsVM EqpExtraFieldsVM { get; set; }

        [JsonProperty("vendorIds")]
        public List<int> VendorIds { get; set; }
    }
}
