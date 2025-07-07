// This file contains TypeScript interfaces converted from C# models used in the irrigation inspection APIs.
// These interfaces are intended for use in a React frontend to ensure type safety and consistency when interacting with the backend API.
// The interfaces include:
// - CreateInspectionViewModel
// - InspectionMasterViewModel
// - InspectionList
// - PropertiesListVM
// - PropertyCountsVM
// - ProgramStartTimeViewModel
// - PlantTypeViewModel
// - WaterSourceViewModel
// - ContollerMasterViewModel

// Note: Some interfaces reference other models that need to be defined or imported, such as ZoneIssuesInspectionViewModel, GetControllersListViewModel, etc.

interface CreateInspectionViewModel {
    id: number;
    title?: string;
    type: number;
    priorEquipment?: string;
    compliant?: string;
    rainSensor?: string;
    waterPressure?: string;
    waterPressureUnit?: string;
    controllerId: number;
    inspectionDate?: Date;
    inspectionModifiedDate?: Date;
    userId: number;
    isInspectionDraft: boolean;
    isInspectionCompleted: boolean;
    isActive: boolean;
    comment?: string;
    zoneIssuesInspectionViewModel?: ZoneIssuesInspectionViewModel[];
}

interface InspectionMasterViewModel {
    getControllersViewModel: GetControllersListViewModel;
    programDetailsList?: ProgramViewModel[];
    seasionalAdjustList?: SeasionalAdjustViewModel[];
    zonesList?: ZoneViewModel[];
    createInspectionViewModel: CreateInspectionViewModel;
    zoneIssuesDropDown?: ZoneIssuesDropDownViewModel[];
    brokenLateralDropdown?: BrokenLateralDropdownViewModel[];
    valveSizeList?: ValveSizeViewModel[];
    sprinklerTypesList?: SprinklerTypesViewModel[];
    plantTypeList?: PlantTypeViewModel[];
    soilTypeList?: SoilTypeViewModel[];
    modelsList?: ModelsViewModels[];
    zoneAreaDropDown?: ZoneAreaDropDownViewModel[];
    manufacturerList?: ManufacturerViewModel[];
}

interface InspectionList {
    inspectionId: number;
    inspectionName?: string;
    controllerId: number;
    controllerName?: string;
    propertyId: number;
    propertyName?: string;
    inspectionDate: Date;
    isInspectionDraft: boolean;
    isInspectionCompleted: boolean;
    inspector?: string;
}

interface PropertiesListVM {
    id: number;
    propertyName?: string;
    address?: string;
    controllerCount: number;
    faults: number;
    totalInspectionIssues: number;
    isActive: boolean;
}

interface PropertyCountsVM {
    totalPropertiesCount: number;
    activePropertiesCount: number;
    inactivePropertiesCount: number;
}

interface ProgramStartTimeViewModel {
    id: number;
    value: string;
}

interface PlantTypeViewModel {
    id: number;
    plantTypeName: string;
    isActive: boolean;
}

interface WaterSourceViewModel {
    id: number;
    waterSourceName?: string;
}

interface ContollerMasterViewModel {
    controllerDetailsViewModel?: ControllerDetailsViewModel;
    programDetailsList?: ControllerProgramsDetailsViewModel[];
    valveSizeList?: ValveSizeViewModel[];
    sprinklerTypesList?: SprinklerTypesViewModel[];
    plantTypeList?: PlantTypeViewModel[];
    soilTypeList?: SoilTypeViewModel[];
    slopeList?: SlopeViewModel[];
    moreOrLessList?: MoreOrLessViewModel[];
    weekDaysList?: WeekDaysViewModel[];
    programRunTimeList?: ProgramRunTimeViewModel[];
    manufacturerList?: ManufacturerViewModel[];
} 