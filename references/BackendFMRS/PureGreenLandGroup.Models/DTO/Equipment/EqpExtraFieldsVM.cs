using Newtonsoft.Json;

namespace PureGreenLandGroup.Models.DTO.Equipment
{
    public class EqpExtraFieldsVM
    {
        [JsonProperty("Division")]
        public string Division { get; set; }

        [JsonProperty("Model")]
        public string Model { get; set; }

        [JsonProperty("Year")]
        public string Year { get; set; }

        [JsonProperty("VIN/SN #")]
        public string VINSN { get; set; }

        [JsonProperty("Engine/Size")]
        public string EngineSize { get; set; }

        [JsonProperty("Make")]
        public string Make { get; set; }

        [JsonProperty("Manufacturer")]
        public string Manufacturer { get; set; }

        [JsonProperty("Purchased Price")]
        public string PurchasedPrice { get; set; }

        [JsonProperty("Purchased Date")]
        public string PurchasedDate { get; set; }

        [JsonProperty("Financing Bank")]
        public string FinancingBank { get; set; }
    }
}
