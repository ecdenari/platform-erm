//#region Constantns declaration begins
const activatePropertyConfirmationMsg = "Are you sure you want to activate this property?";
const deactivatePropertyConfirmationMsg = "Are you sure you want to deactivate this property?";
const activateUserConfirmationMsg = "Are you sure you want to activate this user?";
const deactivateUserConfirmationMsg = "Are you sure you want to deactivate this user?";
const deleteUserConfirmationMsg = "Are you sure you want to delete?";
const deleteUserSuccessMsg = "User deleted Successfully!";
const propertyActivatedMsg = "Property activated successfully!";
const propertyDeactivatedMsg = "Property deactivated successfully!";
const userActivatedMsg = "User activated successfully!";
const userDeactivatedMsg = "User deactivated successfully!";
const serverErrorMsg = "Something went wrong, Please try again!";
//#endregion Constantns ends


// Listen for the popstate event
window.onbeforeunload = function (event) {
    $('#Loader').hide();
};
if (performance.navigation.type === 2) {
    $('#Loader').hide();
}


$(document).ready(function () {

    //#region Layout/common JS
    //remove white spaces from the inputs
    $(".format-input").focusout(function () {
        $(this).val($.trim($(this).val()));
    });

    //for specific pattern user input in input fields
    $('body').on('keypress', ':input[pattern]', function (ev) {
        var regex = new RegExp($(this).attr('pattern'));
        var newVal = $(this).val() + String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
        if (regex.test(newVal)) {
            return true;
        }
        else {
            ev.preventDefault();
            return false;
        }
    });

    //navigation
    var masterNavValue = localStorage.getItem("selected_menu");
    ManageNavigationMenus(masterNavValue);

    // sidebar toggle JS start
    $('.toggle-btn').on('click', function () {
        $(this).toggleClass("is-active");
        $('.sidebar').toggleClass('active-side-bar');
        $('.main-header').toggleClass('active-main-header');
        $('.main-content').toggleClass('active-main-content');
        $('.footerSec').toggleClass('active-footerSec');
        $('.main-logo').toggleClass('hide-main-logo');
        $('.small-logo').toggleClass('show-small-logo');
    });

    $(document).on('click', function (event) {
        if (!$(event.target).closest('.toggle-btn, .sidebar').length) {
            $('.toggle-btn').removeClass("is-active");
            $('.sidebar').removeClass('active-side-bar');
            $('.main-header').removeClass('active-main-header');
            $('.main-content').removeClass('active-main-content');
            $('.footerSec').removeClass('active-footerSec');
            $('.main-logo').removeClass('hide-main-logo');
            $('.small-logo').removeClass('show-small-logo');
        }

    });

    $('.select-btn').each(function (index) {
        $(this).click(function (event) {
            // Prevent the click event from bubbling up to the document
            event.stopPropagation();

            // Find the offset position of td box
            var offset = $(this).offset();
            // Set the dropdown offset position to respective Td box
            $('.select-menu .options').css('left', offset.left);

            $('.select-menu').removeClass('active');
            $(this).parent().addClass("active");

            // Prepopulate chosen value
            // Get the selected value from dropdown-select-content
            var selectedValue = $(this).find('.dropdown-select-content').text().trim();
            // Remove background color from all options
            $(this).siblings('.options').css('background-color', '');

            // Find all <li> elements and remove their background color
            var lis = $(this).siblings('.options').find('li');
            lis.css('background-color', ''); // Reset background color for all options

            if (selectedValue == '') {
                $(lis[25]).css('background-color', '#a3bdf7'); // Apply CSS to the 26th li element
            } else {
                selectedValue = parseInt(selectedValue);
                // Match it with the dropdown values
                $(this).siblings('.options').find('.option').each(function () {
                    var dropdownValue = $(this).data('value');
                    if (selectedValue === dropdownValue) {
                        $(this).css('background-color', '#a3bdf7');
                    } else {
                        $(this).css('background-color', '');
                    }
                });
            }
        });
    });

    // Close the dropdown when clicking outside of it
    $(document).click(function (event) {
        // Check if the click was outside of the active dropdown
        if (!$(event.target).closest('.select-menu').length) {
            $('.select-menu').removeClass('active'); // Remove active class
        }
    });

    //choose value of dropdown and show selected value in input box
    $(".options").children("li").each(function (index) {
        $(this).click(function () {

            var currentTdElement = $(this).parent().parent();
            var content = $(this).data('value'); // Get the value from the data attribute
            content = parseInt(content);
            currentTdElement.removeClass('active');

            //select value
            if (content >= 1 && content <= 25) {
                currentTdElement.find(".dropdown-select-content").text(content);
                currentTdElement.css({
                    'background-color': '#3ea3045e',
                });
                //add selected value to the hidden inputs
                currentTdElement.find("input").val(content);
            }
            //check for the Move column

            else if (content == 28 || content == 29) {

                switch (content) {
                    case 28:
                        currentTdElement.find(".dropdown-select-content").text("Move <3'");
                        break;
                    case 29:
                        currentTdElement.find(".dropdown-select-content").text("Move >3'");
                        break;
                    default: break
                }
                //currentTdElement.find(".dropdown-select-content").text(content);
                currentTdElement.css({
                    'background-color': '#3ea3045e',
                });
                //add selected value to the hidden inputs
                currentTdElement.find("input").val(content);
            }
            //cancel dropdown
            else if (content == 27) {
                $('.select-menu').removeClass('active');
            }
            //clear data - select empty value
            else {
                currentTdElement.find(".dropdown-select-content").html('&nbsp;');
                currentTdElement.css({
                    'background-color': '',
                    //'border-radius': '0px'
                });
            }
        });
    });

    //to open broken lateral dropdown
    $('.brokenhead-btn').each(function (index) {
        $(this).click(function () {
            //find the offset postion of td box
            var offset = $(this).offset();
            //set the dropdown offset postion to respective Td box
            $('.brokenhead-menu .brokenhead-dropdown').css('left', offset.left);
            //$('.select-menu .options').css('right', offset.right);
            $('.brokenhead-menu').removeClass('active');
            $(this).parent().addClass("active");
        });
    });

    if ($('#inspectionDetails').length == 0) {
        //initialize toaster
        $('.toast').show();
        // Hide the toast after 30 seconds
        setTimeout(function () {
            $('.toast').hide();
        }, 4000); // 30000 milliseconds = 30 seconds
    }

    //#region Valve status effect event
    // Select all td elements with the class ValveStatusInput
    var tdElements = document.querySelectorAll('.ValveStatusInput');

    // Add a click event listener to each td element
    tdElements.forEach(function (td) {
        td.addEventListener('click', function () {

            // Find the div inside the clicked td
            var div = this.querySelector('div');
            var textContentSpan = div.querySelector('.dropdown-select-content');
            var input = div.querySelector('input');
            this.classList.remove('zoneIssuesEditableCols');


            // Toggle the text of the div between "In", "Out", and an empty string
            switch (textContentSpan.textContent.trim()) {
                case "Pass":

                    textContentSpan.textContent = "Fail";
                    input.value = "Fail";
                    td.classList.add('valveStatusFail');
                    td.classList.remove('valveStatusPass');
                    //open popup
                    var popupId = td.id;
                    popupId = popupId.replace("Td", "Popup");
                    $(`#${popupId}`).modal('show');
                    break;
                case "Fail":
                    //open popup
                    var popupId = td.id;
                    popupId = popupId.replace("Td", "Popup");
                    $(`#${popupId}`).modal('show');
                    //textContentSpan.textContent = "";
                    //input.value = "";
                    td.classList.add('valveStatusFail');
                    //td.classList.remove('valveStatusPass');
                    break;
                default:
                    textContentSpan.textContent = "Pass";
                    input.value = "Pass";
                    td.classList.remove('valveStatusFail');
                    td.classList.add('valveStatusPass');
                    break;
            }
        });
    });

    //#endregion Valve status effect event

    //#region clogged nozzle event
    // Select all td elements with the class CloggedNozzleTdInput
    var tdElements = document.querySelectorAll('.CloggedNozzleTdInput');

    //to show the clogged nozzle popup
    tdElements.forEach(function (td) {
        td.addEventListener('click', function () {

            td.style.backgroundColor = '#3ea3045e';

            // Find the div inside the clicked td
            var popupId = td.id;
            popupId = popupId.replace("Td", "Popup");

            $(`#${popupId}`).modal('show');

        });
    });

    //#endregion clogged nozzle event

    //#region broken drip event
    // Select all td elements with the class BrokenDripTdInput
    var tdElements = document.querySelectorAll('.BrokenDripTdInput');

    //to show the clogged nozzle popup
    tdElements.forEach(function (td) {
        td.addEventListener('click', function () {

            td.style.backgroundColor = '#3ea3045e';

            // Find the div inside the clicked td
            var popupId = td.id;
            popupId = popupId.replace("Td", "Popup");

            $(`#${popupId}`).modal('show');

        });
    });

    //#endregion  broken drip event

    //#region Create controller page js
    $('body').on('click', '.deleteSavedZone', function () {
        // Find the row to be deleted
        var rowToDelete = $(this).closest('tr');

        // Remove the row from the DOM
        rowToDelete.addClass('hideItem');

        //zoneActionBtns
        rowToDelete.find('.zoneActionBtns input[type="hidden"]').val(true); // Update the zone input

        AutoPopulateZoneNummber();
    });

    $('body').on('click', '.RemoveItem', function () {
        // Find the row to be deleted
        var rowToDelete = $(this).closest('tr');

        // Remove the row from the DOM
        rowToDelete.remove();

        // Reset all the inputs for renumbering the zone name and their Id's
        $('#Zone_dynamic_table tr.dynamicZoneRows').each(function (index) {

            // Update the zone number based on the current index
            $(this).find('.ZoneName_Td input[type="text"].form-control').val(index + 1);

            //update its id and name
            $(this).find('.ZoneName_Td input[type="text"].form-control').attr("id", `ControllerZonesList_${index}__ZoneLocationName`).attr("name", `ControllerZonesList[${index}].ZoneLocationName`);

            //update zone description input id and name
            $(this).find('.ZoneDescription_Td textarea').attr("id", `ControllerZonesList_${index}__Description`).attr("name", `ControllerZonesList[${index}].Description`);

            //update zone program A input id and name
            $(this).find('.ZonePropgramA_Td select').attr("id", `ControllerZonesList_${index}__ProgramA`).attr("name", `ControllerZonesList[${index}].ProgramA`);
            //update zone program B input id and name
            $(this).find('.ZonePropgramB_Td select').attr("id", `ControllerZonesList_${index}__ProgramB`).attr("name", `ControllerZonesList[${index}].ProgramB`);
            //update zone program C input id and name
            $(this).find('.ZonePropgramC_Td select').attr("id", `ControllerZonesList_${index}__ProgramC`).attr("name", `ControllerZonesList[${index}].ProgramC`);
            //update zone program D input id and name
            $(this).find('.ZonePropgramD_Td select').attr("id", `ControllerZonesList_${index}__ProgramD`).attr("name", `ControllerZonesList[${index}].ProgramD`);

            //update zone Valve Size input id and name
            $(this).find('.ZoneValveSizeInput_Td select').attr("id", `ControllerZonesList_${index}__ValveSizeId`).attr("name", `ControllerZonesList[${index}].ValveSizeId`);

            //update zone Valve Size input id and name
            $(this).find('.ZoneFlowRateInput_Td select').attr("id", `ControllerZonesList_${index}__FlowRate`).attr("name", `ControllerZonesList[${index}].FlowRate`);

            //update zone Valve Size input id and name
            $(this).find('.ZoneSprinklerInput_Td select').attr("id", `ControllerZonesList_${index}__SprinkleTypeId`).attr("name", `ControllerZonesList[${index}].SprinkleTypeId`);

            //update zone Valve Size input id and name
            $(this).find('.ZonePlantTypeInput_Td select').attr("id", `ControllerZonesList_${index}__PlantTypeId`).attr("name", `ControllerZonesList[${index}].PlantTypeId`);

            //update zone Valve Size input id and name
            $(this).find('.ZoneSoilTypeInput_Td select').attr("id", `ControllerZonesList_${index}__SoilTypeId`).attr("name", `ControllerZonesList[${index}].SoilTypeId`);
        });
    });

    //add zone dynamically in create controller form
    $("#addmore_item").click(function () {
        var programRunTimeArray = [];
        var valveSizeArray = [];
        var sprinklerArray = [];
        var plantsArray = [];
        var soilArray = [];
        var manufacturerArray = [];
        $.ajax({
            type: "GET",
            url: "/MasterDataManager/GetMasterDataForNewZone",
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                if (response) {
                    programRunTimeArray = response.programRunTimeList;
                    valveSizeArray = response.valveSizes;
                    sprinklerArray = response.sprinklerTypesList;
                    plantsArray = response.plantTypeList;
                    soilArray = response.soilTypeList;
                    manufacturerArray = response.manufacturerList;

                    AutoPopulateZoneNummber();

                    // Increment the counter for unique IDs and names
                    var i = $('#Zone_dynamic_table tr.dynamicZoneRows').length;

                    // Create a new table row
                    var newTableRow = $('<tr>').addClass('dynamicZoneRows');

                    var zoneNameInput_td = $('<td class="ZoneName_Td">');
                    zoneNameInput_td.append(`
                        <input type="text" class="form-control valid" placeholder="Enter zone " id="ControllerZonesList_${i}__ZoneLocationName" name="ControllerZonesList[${i}].ZoneLocationName" value="${i + 1}">
                    `);
                    newTableRow.append(zoneNameInput_td);

                    var zoneDescriptionInput_td = $('<td class="ZoneDescription_Td">');
                    zoneDescriptionInput_td.append(`
                         <textarea type="text" class="form-control" placeholder="Enter zone description" id="ControllerZonesList_${i}__Description"name="ControllerZonesList[${i}].Description" rows="1" maxlength="500"></textarea>
                    `);
                    newTableRow.append(zoneDescriptionInput_td);


                    var programA_td = $('<td  class="ZonePropgramA_Td">');
                    programA_td.append(`
                        <select class="timeZone seclectorItem form-select" id="ControllerZonesList_${i}__ProgramA" name="ControllerZonesList[${i}].ProgramA">
                        </select>
                    `);
                    // Add options to the <select>
                    $.each(programRunTimeArray, function (index, value) {

                        programA_td.find('select').append(
                            $('<option>').val(value.value).text(value.value)
                        );
                    });

                    newTableRow.append(programA_td);

                    var programB_td = $('<td  class="ZonePropgramB_Td">');
                    programB_td.append(`
                        <select class="timeZone seclectorItem form-select" id="ControllerZonesList_${i}__ProgramB" name="ControllerZonesList[${i}].ProgramB">
                        </select>
                    `);
                    // Add options to the <select>
                    $.each(programRunTimeArray, function (index, value) {
                        programB_td.find('select').append(
                            $('<option>').val(value.value).text(value.value)
                        );
                    });
                    newTableRow.append(programB_td);

                    var programC_td = $('<td  class="ZonePropgramC_Td">');
                    programC_td.append(`
                        <select class="timeZone seclectorItem form-select" id="ControllerZonesList_${i}__programC" name="ControllerZonesList[${i}].programC">
                        </select>
                    `);
                    // Add options to the <select>
                    $.each(programRunTimeArray, function (index, value) {
                        programC_td.find('select').append(
                            $('<option>').val(value.value).text(value.value)
                        );
                    });
                    newTableRow.append(programC_td);

                    var programD_td = $('<td  class="ZonePropgramD_Td">');
                    programD_td.append(`
                        <select class="timeZone seclectorItem form-select" id="ControllerZonesList_${i}__programD" name="ControllerZonesList[${i}].programD">
                        </select>
                    `);
                    // Add options to the <select>
                    $.each(programRunTimeArray, function (index, value) {
                        programD_td.find('select').append(
                            $('<option>').val(value.value).text(value.value)
                        );
                    });
                    newTableRow.append(programD_td);

                    var valveSize_td = $('<td  class="ZoneValveSizeInput_Td">');
                    valveSize_td.append(`
                        <select class="timeZone seclectorItem form-select" id="ControllerZonesList_${i}__ValveSizeId" name="ControllerZonesList[${i}].ValveSizeId">
                        </select>
                    `);
                    // Add options to the <select>
                    $.each(valveSizeArray, function (index, valveSize) {

                        valveSize_td.find('select').append(
                            $('<option>').val(valveSize.id).text(valveSize.valveSizenames)
                        );
                    });
                    newTableRow.append(valveSize_td);

                    //valve manufacturer
                    var valveManufacturer_td = $('<td  class="ZoneValveManufacturerInput_Td">');
                    valveManufacturer_td.append(`
                        <select class="timeZone seclectorItem form-select" id="ControllerZonesList_${i}__ManufacturerId" name="ControllerZonesList[${i}].ManufacturerId">
                        </select>
                    `);
                    // Add options to the <select>
                    $.each(manufacturerArray, function (index, manufacturer) {

                        valveManufacturer_td.find('select').append(
                            $('<option>').val(manufacturer.id).text(manufacturer.manufacturerName)
                        );
                    });
                    newTableRow.append(valveManufacturer_td);


                    var flowRate_td = $('<td  class="ZoneFlowRateInput_Td">');
                    flowRate_td.append(`
                        <select class="timeZone seclectorItem form-select" id="ControllerZonesList_${i}__FlowRate" name="ControllerZonesList[${i}].FlowRate">
                           <option value="16">16</option>
                           <option value="17">17</option>
                           <option value="18">18</option>
                           <option value="19">19</option>
                        </select>
                    `);
                    newTableRow.append(flowRate_td);

                    var sprinkler_td = $('<td  class="ZoneSprinklerInput_Td">');
                    sprinkler_td.append(`
                        <select class="timeZone seclectorItem valid form-select" id="ControllerZonesList_${i}__SprinkleTypeId" name="ControllerZonesList[${i}].SprinkleTypeId" >
                         <option value="0">select sprinkler</option>
                        </select>
                    `);
                    // Add options to the <select>
                    $.each(sprinklerArray, function (index, sprinkler) {
                        sprinkler_td.find('select').append(
                            $('<option>').val(sprinkler.id).text(sprinkler.sprinklerTypeName)
                        );
                    });
                    newTableRow.append(sprinkler_td);


                    var plants_td = $('<td  class="ZonePlantTypeInput_Td">');
                    plants_td.append(`
                        <select class="timeZone seclectorItem valid form-select" id="ControllerZonesList_${i}__PlantTypeId" name="ControllerZonesList[${i}].PlantTypeId" >
                        <option value="0">select plant</option>
                        </select>
                    `);
                    // Add options to the <select>
                    $.each(plantsArray, function (index, plantType) {
                        plants_td.find('select').append(
                            $('<option>').val(plantType.id).text(plantType.plantTypeName)
                        );
                    });
                    newTableRow.append(plants_td);

                    var soilTypelist_td = $('<td  class="ZoneSoilTypeInput_Td">');
                    soilTypelist_td.append(`
                        <select class="timeZone seclectorItem valid form-select" id="ControllerZonesList_${i}__SoilTypeId" name="ControllerZonesList[${i}].SoilTypeId"  >
                        <option value="0">select soil</option>
                        </select>
                    `);
                    // Add options to the <select>
                    $.each(soilArray, function (index, soiltype) {
                        soilTypelist_td.find('select').append(
                            $('<option>').val(soiltype.id).text(soiltype.soilTypeName)
                        );
                    });
                    newTableRow.append(soilTypelist_td);

                    // Create a delete button cell
                    var deleteRowBtn_td = $('<td >');
                    deleteRowBtn_td.append('<input type="button" class="RemoveItem btn btn-sm btn-outline-danger" value="X"/>');
                    newTableRow.append(deleteRowBtn_td);

                    // Finally, append the completed row to the table body
                    $('#dynamic_body').append(newTableRow);

                }
            }
        });
        event.preventDefault(); // Prevent the default action of the event
    });

    //event for manipulate controller form for the readonly mode
    if ($('#CreateControllerForm').length > 0) {
        //managing the edit and readonly controller page
        var isReadOnlyController = localStorage.getItem("IsReadOnlyRequested");
        localStorage.setItem("IsReadOnlyRequested", '');
        if (isReadOnlyController != null && isReadOnlyController == "true") {
            // Show the loader
            $('#Loader').show();
            // Make all inputs readonly
            var form = document.getElementById('CreateControllerForm');
            var inputs = form.querySelectorAll('input, select, textarea');

            inputs.forEach(function (input) {
                if (input.tagName.toLowerCase() === 'input') {
                    // Check if it's a checkbox
                    if (input.type.toLowerCase() === 'checkbox') {
                        input.disabled = true;
                    } else {
                        input.readOnly = true;
                    }
                } else if (input.tagName.toLowerCase() === 'select') {
                    input.disabled = true;
                } else if (input.tagName.toLowerCase() === 'textarea') {
                    input.readOnly = true;
                }

            });

            //hide update controller btn
            $('#SaveControllerBtn').hide();
            $('.deleteSavedZone').hide();

            //hide add new controller button
            $('#addmore_item').hide();

            //show edit controller btn
            $('#ControllerEditableBtn').show();

            // Show the loader
            $('#Loader').hide();
        }
    }
    //#endregion Create controller page js


});



//#region Generic methods begins
//Generic Post request
function PostRequest(serverUrl, parameters) {
    return $.post(serverUrl, parameters)
        .done(function (data, status) {
            return { data: data, status: status };
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            return { error: textStatus };
        });
}

//Generic get request
function GetRequest(serverUrl, parameters) {
    return $.get(serverUrl, parameters)
        .done(function (data, status) {
            return { data: data, status: status };
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            return { error: textStatus };
        });
}

//Generic ajax request
function AjaxRequest(url, method = 'GET', data = null, headers = {}) {
    
    return $.ajax({
        url: url,
        type: method,
        data: data,
        headers: headers,
        dataType: 'json', // Specify the expected data type
    })
        .done(function (response) {
            return { data: response, status: 'success' };
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            return { error: textStatus, message: errorThrown };
        });
}

//function to check empty, null or undefined string
//IsNullOrEmpty("abc") -> true
//IsNullOrEmpty(""/undefined/null) -> false
function IsNullOrEmpty(stringValue) {
    return stringValue !== null && stringValue !== undefined && stringValue.trim() !== '';
}
//#endregion Generic methods ends

//#region Create controller page JS begins

function AutoPopulateZoneNummber() {

    var allZoneInputRows = $('#Zone_dynamic_table tr.dynamicZoneRows');
    var counter = 0;
    allZoneInputRows.each(function (index) {
        var aa = $(this).hasClass('hideItem')
        // Check if the current row is visible
        if (!$(this).hasClass('hideItem')) {
            var zoneNameTd = $(this).find('.ZoneName_Td');
            // Update the zone number based on the current index
            var zoneInput = zoneNameTd.find('input');
            zoneInput.val(counter + 1);
            counter += 1;
        }
    });
}


function ShowControllerInReadonlyMode(controllerId) {
    localStorage.setItem("IsReadOnlyRequested", true);
    $('#Loader').show();
    setTimeout(function () {
        $('#Loader').hide();
    }, 1000);
}

function EditControllerForm() {
    localStorage.setItem('IsReadOnlyRequested', '');
    $('#Loader').show();
    setTimeout(function () {
        $('#Loader').hide();
    }, 1000);
    return true;
}

function MakeControllerFormEditable() {

    //empty local storage
    localStorage.setItem("IsReadOnlyRequested", "");

    // Show the loader
    $('#Loader').show();

    // Hide the loader after 5 seconds
    setTimeout(function () {
        $('#Loader').hide();
    }, 1000);

    // Make all inputs readonly
    var form = document.getElementById('CreateControllerForm');
    var inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(function (input) {
        if (input.tagName.toLowerCase() === 'input') {
            // Check if it's a checkbox
            if (input.type.toLowerCase() === 'checkbox') {
                input.disabled = false;
            } else {
                input.readOnly = false;
            }
        } else if (input.tagName.toLowerCase() === 'select') {
            input.disabled = false;
        } else if (input.tagName.toLowerCase() === 'textarea') {
            input.readOnly = false;
        }
    });

    //show update controller btn
    $('#SaveControllerBtn').show();
    $('.deleteSavedZone').show();
    //show add new controller button
    $('#addmore_item').show();

    //hide edit controller btn
    $('#ControllerEditableBtn').hide();
    $('#SeasonalAdjustEditableFormBtn').hide();
}

"use strict";
function SubmitControllerDetails() {

    $('#Loader').show();
    // Get all select elements within the SeasonalAdjustDetailInputForm
    var selects = document.querySelectorAll('#SeasonalAdjustTablebody select[disabled]');

    // Loop through each select element and remove the disabled attribute
    selects.forEach(function (select) {
        select.removeAttribute('disabled');
    });

    var controllerName = $('#ControllerName').val();
    var manfId = $('#ControllerViewModel_ManufacturerId').val();
    var wireTypeId = $('#ControllerViewModel_ControllerType').val();

    var isControllerNameValid = IsNullOrEmpty(controllerName);
    var isManfIdValid = IsNullOrEmpty(manfId);
    var isWireTypeIdValid = IsNullOrEmpty(wireTypeId);

    if (!isControllerNameValid || !isManfIdValid || !isWireTypeIdValid) {
        $('#Loader').hide();
        return false;
    }
    return true;
}
function MakeSeasonalAdjustEditable() {

    // Get all select elements within the SeasonalAdjustDetailInputForm
    var selects = document.querySelectorAll('#SeasonalAdjustTablebody select[disabled]');

    // Loop through each select element and remove the disabled attribute
    selects.forEach(function (select) {
        select.removeAttribute('disabled');
    });

    $('#SeasonalAdjustEditableFormBtn').hide();
}


function RedirectToPropertiesGrid() {
    ManageNavigationMenus('Properties_Menu');
    window.location.href = "/Dashboard/GetPropertiesData";
}


//to bind the model dropdown based on manufacturer chnage
//cascading model dropdown
//call on create controller page and create inspection form for valve status fail popup
function BindModelDropdown(event, zoneIndex, formType) {
    var selectedValue = event.value;

    if (formType == 'inspection') {
        //dropdown on which data is to bind
        var modelDD = $(`#ValveFail_Decoder_ModelId_${zoneIndex}`);
    }
    else if (formType == 'controller') {
        //dropdown on which data is to bind
        var modelDD = $('#ControllerViewModel_ModelId');
        //enable dropdown(disbaled by default)
        // Enable dropdown (it may be disabled by default)
        modelDD.prop('disabled', false);
    }

    // Start loading indication
    $('#Loader').show();

    AjaxRequest(`/MasterDataManager/GetModelListByManufacturerId?manufacturerId=${selectedValue}`, "GET")
        .done(function (response) {

            // Clear the existing options first
            modelDD.empty();

            // Add a default "Select" option
            modelDD.append('<option value="0">--select model--</option>');

            // Bind the model list into the dropdown
            $.each(response, function (index, model) {
                modelDD.append('<option value="' + model.id + '">' + model.modelName + '</option>');
            });
            $('#Loader').hide();
        })
        .fail(function (error) {
            $('#Loader').hide();
            console.error("Error:", error);
        });
}
//#endregion Create controller page JS ends

//#region Layout page JS begins

function ManageNavigationMenus(menuElement) {

    localStorage.setItem("selected_menu", menuElement);
    var activeMenuElm = localStorage.getItem("selected_menu");
    switch (activeMenuElm) {
        case 'Dashboard_Menu':
            $('#SidebarMenusList:not(#Dashboard_Menu)').removeClass('active');
            $('#Dashboard_Menu').parent().addClass('active');
            break;
        case 'Properties_Menu':
            $('#SidebarMenusList:not(#Properties_Menu)').removeClass('active');
            $('#Properties_Menu').parent().addClass('active');
            break;
        case 'AllControllers_Menu':
            $('#SidebarMenusList:not(#AllControllers_Menu)').removeClass('active');
            $('#AllControllers_Menu').parent().addClass('active');
            break;
        case 'Sync_Menu':
            $('#SidebarMenusList:not(#Sync_Menu)').removeClass('active');
            $('#Sync_Menu').parent().addClass('active');
            break;
        case 'Inspection_Menu':
            $('#SidebarMenusList:not(#Inspection_Menu)').removeClass('active');
            $('#Inspection_Menu').parent().addClass('active');
            break;
        case 'CReports_Menu':
            $('#SidebarMenusList:not(#CReports_Menu)').removeClass('active');
            $('#CReports_Menu').parent().addClass('active');
            break;
        case 'Users_Menu':
            $('#SidebarMenusList:not(#Users_Menu)').removeClass('active');
            $('#Users_Menu').parent().addClass('active');
            break;
        case 'Administration_Menu':
            $('#SidebarMenusList:not(#Administration_Menu)').removeClass('active');
            $('#Administration_Menu').parent().addClass('active');
            break;
        default:
            //this default case runs when the application runs at the first time

            var userrole = $('#userrole-text').text();
            if (userrole.trim() == '(Technician)') {
                $('#SidebarMenusList:not(#Properties_Menu)').removeClass('active');
                $('#Properties_Menu').parent().addClass('active');
            }
            else {
                $('#SidebarMenusList:not(#Dashboard_Menu)').removeClass('active');
                $('#Dashboard_Menu').parent().addClass('active');
            }
    }
}
//#endregion Layout page JS begins

//#region Properties js begins

function ManagePropertystatus(id, action) {
    switch (action) {
        case 'false':
            swal({
                title: "Activate property",
                text: activatePropertyConfirmationMsg,
                icon: "warning",
                buttons: {
                    cancel: {
                        text: "No",
                        visible: true,
                    },
                    confirm: {
                        text: "Yes",
                        className: "btn-danger",
                    },
                },
                dangerMode: false,
            })
                .then((willDelete) => {

                    if (willDelete) {
                        UpdatePropertyStatusRequest(id, action);
                    }
                    else {
                        location.reload();
                    }
                });
            break;
        case 'true':
            swal({
                title: "Deactivate property",
                text: deactivatePropertyConfirmationMsg,
                icon: "warning",
                buttons: {
                    cancel: {
                        text: "No",
                        visible: true,
                    },
                    confirm: {
                        text: "Yes",
                        className: "btn-danger",
                    },
                },
                dangerMode: false,
            })
                .then((willDelete) => {

                    if (willDelete) {
                        UpdatePropertyStatusRequest(id, action);
                    }
                    else {
                        location.reload();
                    }
                });
            break;
        default: break;
    }

}

function UpdatePropertyStatusRequest(id, action) {

    var url = "/PropertiesManager/ChangePropertyStatus"
    $.post(url, { id: id, propertyStatus: action }, function (data, status) {
        //console.log(data, status);
        if (action == 'true') {
            swal({
                title: "Deactivated",
                text: propertyDeactivatedMsg,
                icon: "success",
                timer: 1000,
                buttons: false,
            })
                .then(() => {
                    location.reload();
                })
        }
        else if (action == 'false') {
            swal({
                title: "Activated",
                text: propertyActivatedMsg,
                icon: "success",
                timer: 1000,
                buttons: false,
            })
                .then(() => {
                    location.reload();
                })
        }
        else {
            swal("Success", propertyActivatedMsg, "success");
        }
    });
}


function SynProperties() {
    $('#Loader').show();
    AjaxRequest("/PropertiesManager/RefreshProperties", "GET")
        .done(function (response) {
            console.log(response);
            if (response) {
                swal({
                    title: "Success",
                    text: "Properties data synchronised successfully!",
                    icon: "success",
                    timer: 1000,
                    buttons: false,
                })
                    .then(() => {
                        $('#Loader').hide();
                        location.reload();
                    })
            }
        })
        .fail(function (error) {
            $('#Loader').hide();
            console.error("Error:", error);
        });
}
//#endregion Properties js end

//#region Inspection js begins

function CreateInspection(inspectionStatus) {
    if (inspectionStatus == 'completed') {
        swal({
            title: "Are you sure?",
            text: 'Do you want to submit the inspection details?',
            icon: "warning",
            buttons: {
                cancel: {
                    text: "No",
                    visible: true,
                },
                confirm: {
                    text: "Yes",
                    className: "btn-danger",
                },
            },
            dangerMode: false,
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    // Show the loader
                    $('#Loader').show();
                    CreateInspectionRequest(inspectionStatus);
                }
            });
    }
    else {
        // Show the loader
        $('#Loader').show();
        CreateInspectionRequest(inspectionStatus);
    }
}

"use strict";
function CreateInspectionRequest(inspectionStatus) {

    // Show the loader
    $('#Loader').show();

    var inspectionId = $('#InspectionId').val();
    var controllerId = $('#GetControllersViewModel_Id').val();
    var title = $('#CreateInspectionViewModel_Title').val();
    var type = $('#CreateInspectionViewModel_Type').val();
    var priorEquipment = $('#CreateInspectionViewModel_PriorEquipment').val();
    var compliant = $('#CreateInspectionViewModel_Compliant').val();
    var rainSensor = $('#CreateInspectionViewModel_RainSensor').val();
    var waterPressure = $('#CreateInspectionViewModel_WaterPressure').val();
    var waterPressureUnit = $('#CreateInspectionViewModel_WaterPressureUnit').val();
    var comment = $('#CreateInspectionViewModel_Comment').val();

    if (title != null && title != '' && title != undefined) {
        var zoneIssuesData = GetZoneIssuesMasterInputs();
        var createInspectionViewModel = {
            Id: inspectionId,
            ControllerId: controllerId,
            Title: title,
            Type: type,
            PriorEquipment: priorEquipment,
            Compliant: compliant,
            RainSensor: rainSensor,
            WaterPressure: waterPressure,
            WaterPressureUnit: waterPressureUnit,
            Comment: comment,
            ZoneIssuesInspectionViewModel: zoneIssuesData,
        };

        if (inspectionStatus == 'completed') {
            createInspectionViewModel.IsInspectionDraft = false;
            createInspectionViewModel.IsInspectionCompleted = true;
        }
        else {
            createInspectionViewModel.IsInspectionDraft = true;
            createInspectionViewModel.IsInspectionCompleted = false;
        }

        $.ajax({
            url: `/InspectionManager/CreateInspection`, // Adjust the URL to your action method
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(createInspectionViewModel),
            success: function (data) {
                $('#Loader').hide();
                var response = data;
                if (response == 0) {
                    swal({
                        title: "Success",
                        text: "Inspection created successfully!",
                        icon: "success",
                        timer: 1000,
                        buttons: false,
                    })
                        .then(() => {
                            window.location.href = "/InspectionManager/InspectionGridIndex";
                            ManageNavigationMenus('Inspection_Menu');
                        })

                }
                else if (response == 4) {
                    swal("Error", "Bad request", "error");
                }
                else {
                    swal("Error", "Some error occured!", "error");
                }
            },
            error: function (error) {
                console.log(error);
                $('#Loader').hide();

            },
        });
    }
    else {
        swal("Warning", "Please enter inspection title!", "warning")
        $('#Loader').hide();
    }
}


function UpdateInspection(inspectionStatus) {
    if (inspectionStatus == 'completed') {
        swal({
            title: "Are you sure?",
            text: 'Do you want to submit the inspection details?',
            icon: "warning",
            buttons: {
                cancel: {
                    text: "No",
                    visible: true,
                },
                confirm: {
                    text: "Yes",
                    className: "btn-danger",
                },
            },
            dangerMode: false,
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    // Show the loader
                    $('#Loader').show();
                    UpdateInspectionRequest(inspectionStatus);
                }
            });
    }
    else {
        // Show the loader
        $('#Loader').show();
        UpdateInspectionRequest(inspectionStatus);
    }
}

"use strict";
function UpdateInspectionRequest(inspectionStatus) {

    // Show the loader
    $('#Loader').show();

    var inspectionId = $('#InspectionId').val();
    var controllerId = $('#GetControllersViewModel_Id').val();
    var title = $('#CreateInspectionViewModel_Title').val();
    var type = $('#CreateInspectionViewModel_Type').val();
    var priorEquipment = $('#CreateInspectionViewModel_PriorEquipment').val();
    var compliant = $('#CreateInspectionViewModel_Compliant').val();
    var rainSensor = $('#CreateInspectionViewModel_RainSensor').val();
    var waterPressure = $('#CreateInspectionViewModel_WaterPressure').val();
    var waterPressureUnit = $('#CreateInspectionViewModel_WaterPressureUnit').val();
    var comment = $('#CreateInspectionViewModel_Comment').val();


    if (title != null && title != '' && title != undefined) {
        var zoneIssuesData = GetZoneIssuesMasterInputs();
        var createInspectionViewModel = {
            Id: inspectionId,
            ControllerId: controllerId,
            Title: title,
            Type: type,
            PriorEquipment: priorEquipment,
            Compliant: compliant,
            RainSensor: rainSensor,
            WaterPressure: waterPressure,
            WaterPressureUnit: waterPressureUnit,
            Comment: comment,
            ZoneIssuesInspectionViewModel: zoneIssuesData,
        };
        if (inspectionStatus == 'completed') {
            createInspectionViewModel.IsInspectionDraft = false;
            createInspectionViewModel.IsInspectionCompleted = true;
        }
        else {
            createInspectionViewModel.IsInspectionDraft = true;
            createInspectionViewModel.IsInspectionCompleted = false;
        }
        $.post("/InspectionManager/UpdateInspection", { createInspectionViewModel: createInspectionViewModel }, function (data, status) {

            $('#Loader').hide();
            var response = data;
            if (response == 0) {
                swal({
                    title: "Success",
                    text: "Inspection details updated successfully",
                    icon: "success",
                    timer: 1000,
                    buttons: false,
                })
                    .then(() => {
                        window.location.href = "/InspectionManager/InspectionGridIndex";
                        ManageNavigationMenus('Inspection_Menu');
                        // window.location.href = "/Dashboard/InspectionGridDetails";
                    })
                //swal("done", "Inspection details updated successfully", "success");
            }
            else if (response == 4) {
                swal("error", "bad request", "error");
            }
            else {
                swal("error", "some error occured!", "error");
            }
        });
    }
    else {
        swal("Warning", "Please enter inspection title!", "warning")
        $('#Loader').hide();
    }
}
function GetBrokenLateralInputs(zoneId, zoneCounter) {
    var brokenLateralList = [];
    //create list of broken lateral for each zone
    var brokenLateralCount = $(`#BrokenLateralPopup_zoneIndex${zoneId}_count`).val();
    if (brokenLateralCount > 0) {
        for (lateralCounter = 0; lateralCounter < brokenLateralCount; lateralCounter++) {

            var inspectedZoneBrokenLateralViewModel = {
                Id: $(`#BrokenLateralInput_zoneIndex${zoneId}_BrokenLateralInputId${lateralCounter}`).val(),
                ZoneIssuesInspectionId: $(`#InspectedZoneIssuesId_index${zoneCounter}`).val(),
                Value: $(`#BrokenLateralInput_zoneIndex${zoneId}_input${lateralCounter}`).val()
            };

            // Push the object into the list
            brokenLateralList.push(inspectedZoneBrokenLateralViewModel);
        }
    }
    return brokenLateralList;
}

function GetBrokenMainInputs(zoneId, zoneCounter) {
    var brokenMainList = [];
    //create list of broken lateral for each zone
    var brokenMainCount = $(`#BrokenMainPopup_zoneIndex${zoneId}_count`).val();
    if (brokenMainCount > 0) {
        for (mainHeadCounter = 0; mainHeadCounter < brokenMainCount; mainHeadCounter++) {

            var inspectedZoneBrokenMainViewModel = {
                Id: $(`#BrokenMainInput_zoneIndex${zoneId}_BrokenMainInputId${mainHeadCounter}`).val(),
                ZoneIssuesInspectionId: $(`#InspectedZoneIssuesId_index${zoneCounter}`).val(),
                Value: $(`#BrokenMainInput_zoneIndex${zoneId}_input${mainHeadCounter}`).val()
            };

            // Push the object into the list
            brokenMainList.push(inspectedZoneBrokenMainViewModel);
        }
    }
    return brokenMainList;
}

function GetZoneImagesInputs(zoneId, zoneCounter) {

    var zoneImagesList = [];
    //find previewContainers for each zone from their respective image popup
    var previewZoneImageContainer = $(`#PreviewZoneImageContainer_${zoneCounter + 1}`);
    //find the image count of current popup
    var currentZoneUploadedImagesCount = previewZoneImageContainer.find('.imgPreviewDiv').length;

    if (currentZoneUploadedImagesCount > 0) {
        for (imageCounter = 0; imageCounter < currentZoneUploadedImagesCount; imageCounter++) {
            var inspectedZoneImagesViewModel = {
                Id: $(`#ZoneImageInput_zoneIndex${zoneId}_ZoneImageId${imageCounter}`).val(),
                ZoneIssuesInspectionId: $(`#InspectedZoneIssuesId_index${zoneCounter}`).val(),
                ImagePath: $(`#ImagePath_zoneIndex${zoneId}_inputIndex${imageCounter + 1}`).val(),
                ImageCaption: $(`#ImageCaption_zoneIndex${zoneId}_inputIndex${imageCounter + 1}`).val(),
                ImageIssueStatus: $(`#ImageIssues_zoneIndex${zoneId}_inputIndex${imageCounter + 1}`).val()
            };
            // Push the object into the list
            zoneImagesList.push(inspectedZoneImagesViewModel);
        }
    }
    return zoneImagesList;
}
function GetMoveHeadInputs(zoneId, zoneCounter) {

    var moveHeadList = [];
    //create list of broken lateral for each zone
    var moveHeadCount = $(`#MoveHeadPopup_zoneIndex${zoneId}_count`).val();
    if (moveHeadCount > 0) {
        for (mainHeadCounter = 0; mainHeadCounter < moveHeadCount; mainHeadCounter++) {

            var inspectedMoveHeadVM = {
                Id: $(`#MoveHeadInput_zoneIndex${zoneId}_MoveHeadInputId${mainHeadCounter}`).val(),
                ZoneIssuesInspectionId: $(`#InspectedZoneIssuesId_index${zoneCounter}`).val(),
                MoveHeadId: $(`#MoveHeadInput_zoneIndex${zoneId}_input${mainHeadCounter}`).val()
            };

            // Push the object into the list
            moveHeadList.push(inspectedMoveHeadVM);
        }
    }
    return moveHeadList;
}

function GetValveStatusFailInputs(zoneId, zoneCounter) {
    var valveStatusFailVM = {
        Id: $(`#ValveFail_Id_${zoneCounter}`).val(),
        ManufacturerId: $(`#ValveFail_ManufacturerId_${zoneCounter}`).val(),
        ValveSizeId: $(`#ValveFail_ValveSize_${zoneCounter}`).val(),
        IsValveIssue: $(`#ValveFail_IsValveIssue_${zoneCounter}`).is(':checked'),
        IsSolenoidIssue: $(`#ValveFail_IsSolenoidIssue_${zoneCounter}`).is(':checked'),
        IsDecoderIssue: $(`#ValveFail_IsDecoderIssue_${zoneCounter}`).is(':checked'),
        DecoderModelId: $(`#ValveFail_Decoder_ModelId_${zoneCounter}`).val(),
    };
    return valveStatusFailVM;
}

function GetZoneIssuesMasterInputs() {
    // Create an array to hold ZoneIssuesInspectionViewModel data
    var zoneIssuesData = [];

    var inspectionZoneCount = $('#InspectionZoneCount').val();
    if (inspectionZoneCount > 0) {
        for (zoneCounter = 0; zoneCounter < inspectionZoneCount; zoneCounter++) {

            //irrigation settings values
            var zoneId = $(`#InspectionZoneId_${zoneCounter}`).val();

            var zoneViewModel = {
                Id: zoneId,
                Description: $(`#InspectionZoneDescription_${zoneCounter}`).val(),
                SprinkleTypeId: $(`#InspectionZoneSprinklerId_${zoneCounter}`).val(),
                PlantTypeId: $(`#InspectionZonePlantId_${zoneCounter}`).val(),
                SoilTypeId: $(`#InspectionZoneSoilId_${zoneCounter}`).val(),
                ValveSizeId: $(`#InspectionZoneValveSizeId_${zoneCounter}`).val(),
            };


            var brokenLateralList = GetBrokenLateralInputs(zoneId, zoneCounter);
            var brokenMainList = GetBrokenMainInputs(zoneId, zoneCounter);
            var zoneImagesList = GetZoneImagesInputs(zoneId, zoneCounter);
            var valveStatusFailVM = GetValveStatusFailInputs(zoneId, zoneCounter);
            var inspectedMoveHeadList = GetMoveHeadInputs(zoneId, zoneCounter);

            debugger
            var newZoneIssue = {
                Id: $(`#InspectedZoneIssuesId_index${zoneCounter}`).val(),
                InspectionId: $(`#InspectedZoneIssuesId_index${zoneCounter}`).val(),
                ValveStatus: $(`#CreateInspectionViewModel_ZoneIssuesInspectionViewModel_${zoneCounter}__ValveStatus`).val(),
                CloggedNozzle: $(`#CreateInspectionViewModel_ZoneIssuesInspectionViewModel_${zoneCounter}__CloggedNozzle`).val(),
                BrokenSpray: $(`#CreateInspectionViewModel_ZoneIssuesInspectionViewModel_${zoneCounter}__BrokenSpray`).val(),
                BrokenRotor: $(`#CreateInspectionViewModel_ZoneIssuesInspectionViewModel_${zoneCounter}__BrokenRotor`).val(),
                RaiseLower: $(`#CreateInspectionViewModel_ZoneIssuesInspectionViewModel_${zoneCounter}__RaiseLower`).val(),
                Move: $(`#CreateInspectionViewModel_ZoneIssuesInspectionViewModel_${zoneCounter}__Move`).val(),
                Area: $(`#InspectionZoneArea_${zoneCounter}`).val(),
                GpmValue: $(`#InspectionZoneGpmValue_${zoneCounter}`).val(),
                Comment: $(`#InspectionZoneComment_${zoneCounter}`).val(),
                MprCloggedNozzle: $(`#CloggedMprNozzle_${zoneCounter}`).val(),
                VanCloggedNozzle: $(`#CloggedVanNozzle_${zoneCounter}`).val(),

                IsSplice: $(`#IsSplice_${zoneCounter}`).is(':checked'),
                SpliceCount: $(`#SpliceCount_${zoneCounter}`).val(),
                IsLinearRepair: $(`#IsLinearRepair_${zoneCounter}`).is(':checked'),
                LinearRepairValueId: $(`#LinearRepairValue_${zoneCounter}`).val(),

                InspectedZoneBrokenLateralList: brokenLateralList,
                InspectedZoneBrokenMainViewModel: brokenMainList,
                InspectedZoneImagesList: zoneImagesList,
                InspectedValveFailVM: valveStatusFailVM,
                InspectedMoveHeadList: inspectedMoveHeadList,
                ZoneViewModel: zoneViewModel
            };
            if (newZoneIssue.IsSplice) {
                newZoneIssue.SpliceCount = $(`#SpliceCount_${zoneCounter}`).val();
            }
            else {
                newZoneIssue.SpliceCount = 0;
            }
            if (newZoneIssue.IsLinearRepair) {
                newZoneIssue.LinearRepairValueId = $(`#LinearRepairValue_${zoneCounter}`).val();
            }
            else {
                newZoneIssue.LinearRepairValueId = 0;
            }
            // Push the second instance into the array
            zoneIssuesData.push(newZoneIssue);
        }
    }
    return zoneIssuesData;
}

function ShowZoneIrrigationSettingsPopup(zoneId) {

    $.get("/Dashboard/GetZoneDetailsByZoneId", { zoneId: zoneId }, function (data, status) {

        if (status == 'success') {
            $('#ZoneIrrigationSettingsPopup .modal-body').html(data);
            $('#ZoneIrrigationSettingsPopup').modal('show');
        }
    });
}
function SpliceRepairInputs(counter) {
    var isSpilice = $(`#IsSplice_${counter}`).is(':checked');
    if (isSpilice) {
        $(`#SpliceCount_${counter}`).attr('disabled', false);
    }
    else {
        $(`#SpliceCount_${counter}`).attr('disabled', true);
    }
}

function LinearRepairInputs(counter) {
    var isLinear = $(`#IsLinearRepair_${counter}`).is(':checked');
    if (isLinear) {
        $(`#LinearRepairValue_${counter}`).attr('disabled', false);
    }
    else {
        $(`#LinearRepairValue_${counter}`).attr('disabled', true);
    }
}

function SaveAndCloseBrokenDrip(event) {
    debugger
    // Find the parent modal dynamically (Assuming the button clicked is inside the modal)
    const modal = event.target.closest('.modal');

    // Get modal ID and modify it to get the corresponding td block ID
    var modalId = modal.id;
    var tdBlockId = modalId.replace('Popup', 'Td'); // Replace 'Popup' with 'Td' in the modal's ID

    // Find all checkbox inputs inside the modal
    const checkboxes = modal.querySelectorAll('input[type="checkbox"]');

    // Check if any checkbox is checked
    let isChecked = false;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            isChecked = true;
        }
    });

    // Get the corresponding td block element by the dynamically constructed ID
    var tdBlock = document.querySelector(`#${tdBlockId}`);

    // Apply logic based on whether a checkbox is checked or not
    if (isChecked) {

        // Set a background color to the td block
        tdBlock.style.backgroundColor = '#ff6666'; // You can change the color as needed
        tdBlock.style.color = '#fff'; // You can change the color as needed

        // Add text to the .dropdown-select-content inside the td block
        var dropdownContent = tdBlock.querySelector('.dropdown-select-content');
        dropdownContent.textContent = 'Fault'; // Adding 'Fault' as the text content
    }
    else {

        // Set a background color to the td block
        tdBlock.style.backgroundColor = ''; // You can change the color as needed

        // Add text to the .dropdown-select-content inside the td block
        var dropdownContent = tdBlock.querySelector('.dropdown-select-content');
        dropdownContent.textContent = ''; // Adding 'Fault' as the text content
    }

    // Close the modal
    $(modal).modal('hide');
}
function GetInspectionByStatusFilter(status) {
    var inspectionStatus = 0;
    if (status == 'draft') {
        inspectionStatus = 1;
    }
    else if (status == 'completed') {
        inspectionStatus = 2;
    }
    else if (status == 'all') {
        inspectionStatus = 0;
    }
    $.get("/InspectionManager/GetInspectionByStatusFilter", { inspectionStatus: inspectionStatus }, function (data, status) {
        if (status == 'success') {
            $('#InspectionGridContainer').empty();
            $('#InspectionGridContainer').html(data);
        }
    });
}

function MakeTdActiveForInput(event) {
    var curretTd = event.target.id;
    localStorage.setItem("currentTd", curretTd);
}

function SetZoneIssueCommonInputsValue(event) {

    // Get the ID of the current TD from local storage
    var currentTdId = localStorage.getItem("currentTd");
    if (!currentTdId) {
        return;
    }

    // Get the selected value from the clicked element
    var selectedValue = event.target.textContent;

    // Find the TD element using the stored ID
    var currentTdElement = document.getElementById(currentTdId);
    if (!currentTdElement) {
        return;
    }

    // Update the text content of the span within the TD
    var contentSpan = currentTdElement.querySelector('.dropdown-select-content');
    if (contentSpan) {
        contentSpan.textContent = selectedValue;
    }

    // Update the value of the hidden input within the TD
    var contentInput = currentTdElement.querySelector('.ZoneCommonInput input');
    if (contentInput) {
        contentInput.value = selectedValue;
    }

    // Apply styling to the TD to indicate the selection
    currentTdElement.style.backgroundColor = '#3ea3045e';
    currentTdElement.style.borderRadius = '5px';
}

function SetBrokenHeads(event, headValue, headType, zoneIndex, popupIndex) {
    // Get the value from the data attribute or the value attribute of the target element
    // Find the closest parent <td> element and then find the <span> inside it
    var td = event.target.closest('td');
    var textContainer = td.querySelector('.ZoneCommonInput');

    var textContentSpan = textContainer.querySelector('.dropdown-select-content');
    var input = textContainer.querySelector('input');

    // Update the text of the <span> with the value
    textContentSpan.textContent = headValue;

    // Check if the input field exists
    if (input) {
        // Update the value of the input field
        input.value = headValue;
    }

    // Apply the CSS styles to the <td>
    td.style.backgroundColor = '#3ea3045e';
    td.style.borderRadius = '5px';

    //hide dropdown

    if (headValue > 0) {
        if (headType == 'lateralhead') {
            // Create the dynamic HTML
            var htmlContent = '';
            for (var i = 0; i < headValue; i++) {
                htmlContent += `
                <div class="row p-2">
                    <div class="col-2">
                        <h4>${i + 1}#</h4>
                    </div>
                    <div class="col">
                        <select class="form-select" id="BrokenLateralInput_zoneIndex${zoneIndex}_input${i}">
                            <option value="1">3/4"</option>
                            <option value="2">1"</option>
                            <option value="3">1 1/4"</option>
                            <option value="4">1 1/2"</option>
                            <option value="5">2"</option>
                            <option value="6">2 1/2"</option>
                        </select>
                    </div>
                </div>`;
            }
            var popupId = `#BrokenLateralPopup_zoneIndex${zoneIndex}_popupindex${popupIndex}`;
            $(`${popupId} .modal-body`).empty();
            $(`${popupId} .modal-body`).append(htmlContent);
            $(`${popupId}`).modal('show');

        }
        else if (headType == 'brokenhead') {
            // Create the dynamic HTML
            var htmlContent = '';
            for (var i = 0; i < headValue; i++) {
                htmlContent += `
                <div class="row p-2">
                    <div class="col-2">
                        <h4>${i + 1}#</h4>
                    </div>
                    <div class="col">
                        <select class="form-select" id="BrokenMainInput_zoneIndex${zoneIndex}_input${i}">
                            <option value="7">1 1/2"</option>
                            <option value="8" >2"</option>
                            <option value="9" >2 1/2"</option>
                            <option value="10" >3"</option>
                            <option value="11"" >4"</option>
                        </select>   
                    </div>
                </div>`;
            }
            var popupId = `#BrokenMainPopup_zoneIndex${zoneIndex}_popupindex${popupIndex}`;
            $(`${popupId} .modal-body`).empty();
            $(`${popupId} .modal-body`).append(htmlContent);
            $(`${popupId}`).modal('show');
        }
        else if (headType == 'movehead') {
            // Create the dynamic HTML
            var htmlContent = '';
            for (var i = 0; i < headValue; i++) {
                htmlContent += `
                <div class="row p-2">
                    <div class="col-2">
                        <h4>${i + 1}#</h4>
                    </div>
                    <div class="col">
                        <select class="form-select" id="MoveHeadInput_zoneIndex${zoneIndex}_input${i}">
                            <option value="1">Move <3'</option>
                            <option value="2" >Move >3'</option>
                        </select>
                    </div>
                </div>`;
            }

            var popupId = `#MoveHeadPopup_zoneIndex${zoneIndex}_popupindex${popupIndex}`;
            $(`${popupId} .modal-body`).empty();
            $(`${popupId} .modal-body`).append(htmlContent);
            $(`${popupId}`).modal('show');
        }

        $('.brokenhead-menu').removeClass('active');
        // $('.select-menu').removeClass('active');
    }
}

function PreviewZoneIssuesImage(event, zoneIndex, popupIndex) {

    // Show the loader
    $('#Loader').show();

    // Hide the loader after 5 seconds
    setTimeout(function () {
        $('#Loader').hide();
    }, 1000);

    var imageFileName = event.target.files[0].name;
    if (imageFileName != "") {

        var extension = GetFileExtension(imageFileName);
        if (extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "jfif") {
            var fileInput = event.target;
            var files = fileInput.files;
            if (files.length > 0) {
                // Create a FormData object to store the file
                var formData = new FormData();
                formData.append('zoneImageFile', files[0]);

                // Find the number of imgPreviewDiv elements
                var previewZoneImageContainer = $(`#PreviewZoneImageContainer_${popupIndex}`);
                var currentZoneUploadedImagesCount = previewZoneImageContainer.find('.imgPreviewDiv').length;

                $.ajax({
                    url: `/InspectionManager/SaveZoneImage?zoneId=${zoneIndex}&zoneImagesCount=${currentZoneUploadedImagesCount}`, // Adjust the URL to your action method
                    type: 'POST',
                    data: formData,
                    processData: false, // Tell jQuery not to process the data
                    contentType: false, // Tell jQuery not to set the content type
                    cache: false,
                    success: function (data) {
                        var imageModel = data;
                        var previewImageContainer = `<div class="row imgPreviewDiv">
            <div class="col-4 col-lg-3 mb-2">
                <a href="${imageModel.imagePath}" target="_blank" class="w-100" title="click to see original file">
                    <div class="imagePreview w-100">
                        <input type="hidden" id="ImagePath_zoneIndex${zoneIndex}_inputIndex${currentZoneUploadedImagesCount + 1}" value="${imageModel.imageSrcPath}"/>
                        <img src="${imageModel.imagePath}" alt="zone image"/>
                        ${imageModel.imageName}
                    </div>
                </a>
            </div>
            <div class="col-6 col-lg-7">
                <div class="container">
                    <div class="row pb-4">
                        <input type="text" class="form-control" id="ImageCaption_zoneIndex${zoneIndex}_inputIndex${currentZoneUploadedImagesCount + 1}" placeholder="Enter image caption" />
                    </div>
                    <div class="row pt-1 ">
                        <select class="form-select" id="ImageIssues_zoneIndex${zoneIndex}_inputIndex${currentZoneUploadedImagesCount + 1}">
                            <option value="0">Select Issue</option>
                            <option value="1">Valve Status</option>
                            <option value="2">Clogged Nozzle</option>
                            <option value="3">Blocked Head</option>
                            <option value="4">Broken Head</option>
                            <option value="5">Raise Head</option>
                            <option value="6">Lower Head</option>
                            <option value="7">Replace Head</option>
                            <option value="8">Broken Drip/Micro Spray</option>
                            <option value="9">Broken Lateral</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-2 ">
                <a href="#" class="btn btn-outline-warning " onclick="DeleteImage(event)"><i class="fas fa-trash-alt"></i></a>
            </div>
        </div>`;

                        var popupId = `#ZoneImagesPopup_zoneIndex${zoneIndex}_popupindex${popupIndex}`;
                        var imagePrevContainerDiv = `#PreviewZoneImageContainer_${popupIndex}`;
                        $(`${popupId} .modal-body ${imagePrevContainerDiv}`).append(previewImageContainer);
                        //$(`${popupId} .modal-body ${imagePrevContainerDiv}`).html(previewImageContainer);
                    }
                });
            }
        }
        else {
            sweetAlert("Warning", "Please select an image to continue!", "warning");
        }
    } else {
        sweetAlert("Warning", "Please select an image to continue!", "warning");
    }
}

function DeleteImage(event) {
    swal({
        title: "Delete Image!",
        text: 'Are you sure you want to delete this image?',
        icon: "warning",
        buttons: {
            cancel: {
                text: "No",
                visible: true,
            },
            confirm: {
                text: "Yes",
                className: "btn-danger",
            },
        },
        dangerMode: false,
    })
        .then((willDelete) => {
            var imgPreviewDiv = event.target.closest('.imgPreviewDiv');
            if (willDelete) {
                if (imgPreviewDiv) {
                    imgPreviewDiv.remove();
                }
            }
        });
}

function ResetIrrigationSettings(zoneIndex) {

    //get initial values of irrigation settings
    //var sprinklerId = $(`#Saved_InspectionZoneSprinklerId_${zoneIndex}`).val();
    var plantId = $(`#Saved_InspectionZonePlantId_${zoneIndex}`).val();
    var soilId = $(`#Saved_InspectionZoneSoilId_${zoneIndex}`).val();
    var valveId = $(`#Saved_InspectionZoneValveSizeId_${zoneIndex}`).val();
    var gpmValue = $(`#Saved_InspectionZoneGpmValue_${zoneIndex}`).val();

    // $(`#InspectionZoneSprinklerId_${zoneIndex}`).val(sprinklerId);
    $(`#InspectionZonePlantId_${zoneIndex}`).val(plantId);
    $(`#InspectionZoneSoilId_${zoneIndex}`).val(soilId);
    $(`#InspectionZoneValveSizeId_${zoneIndex}`).val(valveId);
    $(`#InspectionZoneGpmValue_${zoneIndex}`).val(gpmValue);
}

function EditInspectionSeasonalAdjust() {
    var seasonalAdjustDropdownList = [];

    // Make the AJAX request to get the dropdown values
    AjaxRequest('/MasterDataManager/GetSeasonalAdjustDropdownList', 'GET')
        .done(function (response) {

            // hide the edit button
            $('#EditInspectionSeasonalAdjustBtn').hide();
            //show update button
            $('#UpdateInspectionSeasonalAdjustBtn').show();

            // Store the response data (if it's valid)
            seasonalAdjustDropdownList = response;  // Only include active items

            var inspectionTable = document.querySelector('.inspection-seasonal-table');

            // Find all input elements within the table
            var inputs = inspectionTable.querySelectorAll('input');

            // Iterate over all input elements and replace them with select elements
            inputs.forEach(function (input) {
                //debugger
                // Get the parent element of the input
                var parent = input.parentNode;

                // Create a new select element
                var select = document.createElement('select');
                select.classList.add('form-select');

                // Add options dynamically from the response data
                seasonalAdjustDropdownList.forEach(function (optionData) {
                    //debugger
                    var option = document.createElement('option');
                    option.value = optionData.id;  // Use Id as the value
                    option.textContent = optionData.value + '%';  // Use Value as the display text, adding '%' symbol

                    // Check if the input value matches the dropdown value, and set the option as selected if true
                    if (parseInt(input.value) == optionData.value) {
                        option.selected = true;
                    }

                    select.appendChild(option);
                });

                // Replace the parent element with the select element
                parent.parentNode.replaceChild(select, parent);
            });
        })
        .fail(function (error) {
            alert('No data available!');
        });
}

function UpdateInspectionSeasonalAdjust() {
    $('#Loader').show();
    

    setTimeout(function () {
        $('#Loader').hide();
    }, 1000);
    // Find all the rows of the inspection table
    const rows = document.querySelectorAll('.inspection-seasonal-table tr');

    var seasonalAdjustVMList = []; // This will store the data for sending to the server
    var seasonalAdjustSelectInputText = []; // This will store the selected texts for UI manipulation
    var rowNumber = 0;
    var controllerId = $('#GetControllersViewModel_Id').val();

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');

        if (rowNumber > 0) {
            // Get the <select> element within each cell
            const selectA = cells[1].querySelector('select');
            const selectB = cells[2].querySelector('select');
            const selectC = cells[3].querySelector('select');
            const selectD = cells[4].querySelector('select');

            // Get the selected values and texts (value for server and text for UI)
            const selectedValueA = selectA ? selectA.value : 0;
            const selectedValueB = selectB ? selectB.value : 0;
            const selectedValueC = selectC ? selectC.value : 0;
            const selectedValueD = selectD ? selectD.value : 0;

            const selectedTextA = selectA ? selectA.options[selectA.selectedIndex].text : '';
            const selectedTextB = selectB ? selectB.options[selectB.selectedIndex].text : '';
            const selectedTextC = selectC ? selectC.options[selectC.selectedIndex].text : '';
            const selectedTextD = selectD ? selectD.options[selectD.selectedIndex].text : '';

            // Store in seasonalAdjustVMList for sending to the server
            var seasonalAdjustViewModel = {
                ControllerId: controllerId,
                MonthId: rowNumber,
                ProgramA: selectedValueA,  // Using value for server data
                ProgramB: selectedValueB,
                ProgramC: selectedValueC,
                ProgramD: selectedValueD
            };
            seasonalAdjustVMList.push(seasonalAdjustViewModel);

            // Store in seasonalAdjustSelectInputText for UI manipulation (with text for display)
            var seasonalAdjustSelectInputTextModel = {
                ControllerId: controllerId,
                MonthId: rowNumber,
                ProgramA: selectedTextA,  // Using text for UI manipulation
                ProgramB: selectedTextB,
                ProgramC: selectedTextC,
                ProgramD: selectedTextD
            };
            seasonalAdjustSelectInputText.push(seasonalAdjustSelectInputTextModel);
        }
        rowNumber += 1;
    });

    // Ensure the data is serialized to JSON before sending it
    const serializedData = JSON.stringify(seasonalAdjustVMList);

    // Set headers for JSON request
    var headers = {
        'Content-Type': 'application/json'
    };

    // Make the AJAX request
    AjaxRequest('/InspectionManager/UpdateInspectionSeasonalAdjust?controllerId=' + controllerId, 'POST', serializedData, headers)
        .done(function (response) {
            // Hide the edit button and show the update button
            $('#EditInspectionSeasonalAdjustBtn').show();
            $('#UpdateInspectionSeasonalAdjustBtn').hide();

            let rowNumber = 0;

            // Iterate over the rows to update the inputs with selected text from seasonalAdjustSelectInputText
            rows.forEach((row, index) => {
                if (rowNumber > 0) {
                    const cells = row.querySelectorAll('td');

                    // Use the seasonalAdjustSelectInputText data for populating the inputs with selected texts
                    const data = seasonalAdjustSelectInputText[rowNumber - 1]; // Get corresponding data for the row

                    if (data) {
                        if (cells.length > 1) {
                            const selectA = data.ProgramA || '';
                            cells[1].innerHTML = `
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" value="${selectA.replace("%","")}" readonly />
                                    <span class="input-group-text" id="basic-addon2">%</span>
                                </div>
                            `;
                        }
                        if (cells.length > 2) {
                            const selectB = data.ProgramB || '';
                            cells[2].innerHTML = `
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" value="${selectB.replace("%", "") }" readonly />
                                    <span class="input-group-text" id="basic-addon2">%</span>
                                </div>
                            `;
                        }
                        if (cells.length > 3) {
                            const selectC = data.ProgramC || '';
                            cells[3].innerHTML = `
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" value="${selectC.replace("%", "") }" readonly />
                                    <span class="input-group-text" id="basic-addon2">%</span>
                                </div>
                            `;
                        }
                        if (cells.length > 4) {
                            const selectD = data.ProgramD || '';
                            cells[4].innerHTML = `
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" value="${selectD.replace("%", "") }" readonly />
                                    <span class="input-group-text" id="basic-addon2">%</span>
                                </div>
                            `;
                        }
                    }
                }
                rowNumber += 1;
            });
            //$('#Loader').hide();
        })
        .fail(function (error) {
            $('#Loader').hide();
            alert('No data available!');
        });
}

function GetFileExtension(filename) {
    // Get the last index of the dot character
    const index = filename.lastIndexOf('.');

    // Check if a dot exists and is not the first character
    if (index > 0) {
        return filename.substring(index + 1);
    }

    // Return an empty string if no extension is found
    return '';
}
function CloseBrokenHeadDropdown() {
    $('.brokenhead-menu').removeClass('active');
}

function DownloadInspectionPdfReport(inspectionId) {

    // Show the loader
    $('#Loader').show();

    // Make an AJAX request to get the file
    $.ajax({
        url: '/Reports/GenerateInspectionPDF', // URL to the action method
        type: 'GET', // HTTP method
        data: { inspectionId: inspectionId }, // Additional parameters
        success: function (data, textStatus, jqXHR) {

            // Check if the request was successful
            if (jqXHR.status === 200) {
                // Create a Blob from the response
                var blob = new Blob([data], { type: 'application/pdf' });

                // Get the filename from the Content-Disposition header
                var disposition = jqXHR.getResponseHeader('Content-Disposition');
                var filename = disposition.split('filename=')[1];
                filename = filename.replace(/"/g, ''); // Remove any quotation marks

                // Create a link element
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename; // Use the filename from the header

                // Trigger the download
                link.click();

                // Hide the loader after the download is triggered
                $('#Loader').hide();

                // Revoke the object URL after the download
                setTimeout(function () {
                    URL.revokeObjectURL(link.href);
                }, 100);
            } else {
                // Hide the loader in case of an error
                $('#Loader').hide();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('An error occurred!');
            // Hide the loader in case of an error
            $('#Loader').hide();
        },
        xhrFields: {
            responseType: 'blob' // Force the HTTP response to a Blob
        }
    });
}

function ExportCatalogMappingCSV(inspectionId) {
    // Show the loader
    $('#Loader').show();

    // Make an AJAX request to get the file
    $.ajax({
        url: '/Reports/ExportCatalogMappingCSV?inspectionId=' + inspectionId, // URL to the action method
        type: 'GET',
        success: function (data, textStatus, jqXHR) {
            // Check if the request was successful
            if (jqXHR.status === 200) {
                // Create a Blob from the response
                var blob = new Blob([data], { type: 'application/pdf' });

                // Get the filename from the Content-Disposition header
                var disposition = jqXHR.getResponseHeader('Content-Disposition');
                var filename = disposition.split('filename=')[1];
                filename = filename.replace(/"/g, ''); // Remove any quotation marks

                // Create a link element
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename; // Use the filename from the header

                // Trigger the download
                link.click();

                $('#Loader').hide();

                // Revoke the object URL after the download
                setTimeout(function () {
                    URL.revokeObjectURL(link.href);
                }, 100);
            } else {
                // Hide the loader in case of an error
                $('#Loader').hide();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('An error occurred!');
            // Hide the loader in case of an error
            $('#Loader').hide();
        },
        xhrFields: {
            responseType: 'blob' // Force the HTTP response to a Blob
        }
    });
}

function RenderInspectionPdf(inspectionId) {
    $('#Loader').show();
    //add inspection id on pdf btns
    //onclick="DownloadInspectionPdfReport('@inspectionDetails.InspectionId');"
    // Select the button element by its ID
    var downloadInsPdfBtn = document.getElementById('DownloadInsPdfBtn');
    var openSendReportonEmailBtn = document.getElementById('OpenSendReportonEmailBtn');

    // Set the 'onclick' attribute to execute the DownloadInspectionPdfReport function
    downloadInsPdfBtn.setAttribute("onclick", `DownloadInspectionPdfReport('${inspectionId}');`);
    openSendReportonEmailBtn.setAttribute("onclick", `SendReportEmail('${inspectionId}');`);

    fetch('/Reports/RenderInspectionReport?inspectionId=' + inspectionId)
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const iframe = document.getElementById('pdfIframe');
            iframe.src = url;
            iframe.style.display = 'block';
            $('#ReportContainer').show();
            $('#InspectionGridContainer').hide();
            $('#Inspection_grid_navbar').hide();
            $('#Loader').hide();
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
}

function SendReportEmail(intpectionId) {
    $('#Inspection_id').val(intpectionId);
    $('#SendReportOnEmailPopup').modal('show');
}

function SendInspectionReportOnEmailRequest() {

    $('#Loader').show();
    var emails = $('#EmailIdsInputs').val();
    var Inspection_id = $('#Inspection_id').val();
    if (IsNullOrEmpty(emails)) {
        //send request to server
        var url = '/Reports/SendInspectionReportOnEmail';

        PostRequest(url, { emailInputs: emails, inspectionId: Inspection_id })
            .then(function (response) {

                if (response.error) {
                    swal("Error", serverErrorMsg, "error");
                    $('#Loader').hide();

                } else {
                    if (response) {
                        swal({
                            title: "Success",
                            text: "Email sent successfully!",
                            icon: "success",
                            timer: 1000,
                            buttons: false,
                        })
                            .then(() => {
                                $('#Loader').hide();
                                location.reload();
                            })
                    }
                }
            });
    }
    else {
        $('#Loader').hide();
        const emailValidationText = document.getElementById("EmailValidationText");
        emailValidationText.textContent = `Please enter a email address.`;

    }
}

function ValidateReportEmails(input) {

    const emailValidationText = document.getElementById("EmailValidationText");
    const emails = input.value.split(';').map(email => email.trim());
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern

    // Clear previous validation messages
    emailValidationText.textContent = '';

    // Check each email
    for (let email of emails) {
        if (email && !emailPattern.test(email)) {
            emailValidationText.textContent += `${email} is not a valid email format. `;
        }
    }

    // If no invalid emails, you can add a success message or further processing
    if (emailValidationText.textContent === '') {
        emailValidationText.textContent = '';
    }
}

//took the input values and calculate the total clogged nozzle then shows the total value to its coresponding 
function UpdateAndCloseCloggedNozzlePopup(event, zoneId, popupIndex, totalNozzles) {
    var modal = event.target.closest('.modal');

    // Find the corresponding td element
    var tdInput = $(`#CloggedNozzleTd_zoneIndex${zoneId}_popupindex${popupIndex}`);

    // Find the span inside that td (using jQuery to find it)
    var textSpan = tdInput.find('.dropdown-select-content');

    // Update the text of the span with the value
    if (totalNozzles == 0) {
        textSpan.text('');
        tdInput.css('background-color', '');
    }
    else {
        textSpan.text(totalNozzles);
    }

    // Hide the modal (using Bootstrap's modal hide method)
    $(modal).modal('hide');
}

function SaveCloggedNozzle(event, zoneId, popupIndex, action) {
    switch (action) {
        case 'set':
            // Get the values of the two selects (MPR Nozzle, Van Nozzle)
            var modal = event.target.closest('.modal');
            var mprNozzleValue = Number(modal.querySelector('.mprNozzleInput').value);
            var vanNozzleValue = Number(modal.querySelector('.vanNozzleInput').value);

            var totalNozzles = mprNozzleValue + vanNozzleValue;

            // Update and hide the modal
            UpdateAndCloseCloggedNozzlePopup(event, zoneId, popupIndex, totalNozzles);
            break;

        case 'reset':
            // Reset the values of the selects
            var modal = event.target.closest('.modal');
            modal.querySelector('.mprNozzleInput').value = 0;
            modal.querySelector('.vanNozzleInput').value = 0;

            // Reset the span text and hide the modal
            UpdateAndCloseCloggedNozzlePopup(event, zoneId, popupIndex, 0);
            break;

        default:
            alert(serverErrorMsg);
    }
}
function ResetCloggedNozzle(zoneCounter) {
    var mprNozzle = $(`#Saved_CloggedMprNozzle_${zoneCounter}`).val();
    var vanNozzle = $(`#Saved_CloggedVanNozzle_${zoneCounter}`).val();
    $(`#CloggedMprNozzle_${zoneCounter}`).val(mprNozzle);
    $(`#CloggedVanNozzle_${zoneCounter}`).val(vanNozzle);
}

function ResetValveStatus(event, zoneId, popupIndex) {
    //find the current model popup
    var zoneCounter = popupIndex - 1;
    var modal = event.target.closest('.modal');
    //find all the inputs of this popup including select and checkboxex
    //then  clear their value
    var inputs = modal.querySelectorAll('input, select, textarea');

    // Reset all inputs (clear their values)
    var valveSizeId = $(`#Saved_InspectionZoneValveSizeId_${zoneCounter}`).val();
    var isValveIssue = $(`#SavedValveIssueValue_${zoneCounter}`).val();
    var isSolenoidIssue = $(`#SavedSolenoidIssueValue_${zoneCounter}`).val();
    var isDecoderIssue = $(`#SavedDecoderIssueValue_${zoneCounter}`).val();
    var decoderModelId = $(`#SavedDecoderModelIdValue_${zoneCounter}`).val();

    $(`#ValveFail_ValveSize_${zoneCounter}`).val(valveSizeId);
    $(`#ValveFail_IsValveIssue_${zoneCounter}`).prop("checked", isValveIssue);
    $(`#ValveFail_IsSolenoidIssue_${zoneCounter}`).prop("checked", isSolenoidIssue);
    $(`#ValveFail_IsDecoderIssue_${zoneCounter}`).prop("checked", isDecoderIssue);
    $(`#ValveFail_Decoder_ModelId_${zoneCounter}`).val(decoderModelId);

    // Find the corresponding td element
    var tdInput = $(`#ValveFailTd_zoneIndex${zoneId}_popupindex${popupIndex}`);

    // Find the span inside that td (using jQuery to find it)
    var textSpan = tdInput.find('.dropdown-select-content');
    // Update the text of the span with the value
    textSpan.text('');
    tdInput.removeClass('valveStatusFail');
    // Find the closest '.decoderInputs' container to the checkbox
    var decoderInputsContainer = $(`#decoderInputs_${popupIndex - 1}`);
    decoderInputsContainer.hide();
    $(modal).modal('hide');
}

function DecoderInputs(event, zoneIndex) {

    // Get the checkbox element
    var checkbox = event.target;

    // Find the closest '.decoderInputs' container to the checkbox
    var decoderInputsContainer = $(`#decoderInputs_${zoneIndex}`);

    // Check if the checkbox is checked or not
    if (checkbox.checked) {
        // Hide the '.decoderInputs' container
        decoderInputsContainer.show();
    } else {
        // Show the '.decoderInputs' container
        decoderInputsContainer.hide();
    }
}
//#endregion Inspection js end

//#region USER MANAGEMENT BEGINS
function DeleteUser(userId) {
    swal({
        title: "Delete user",
        text: deleteUserConfirmationMsg,
        icon: "warning",
        buttons: {
            cancel: {
                text: "No",
                visible: true,
            },
            confirm: {
                text: "Yes",
                className: "btn-danger",
            },
        },
        dangerMode: false,
    })
        .then((willDelete) => {

            if (willDelete) {
                DeleteUserRequest(userId);
            }
        });
}
function DeleteUserRequest(userId) {

    PostRequest('/Account/DeleteUser', { userId: userId })
        .then(function (response) {

            if (response.error) {
                swal("Error", serverErrorMsg, "error");
            } else {
                if (response) {
                    swal({
                        title: "Success",
                        text: deleteUserSuccessMsg,
                        icon: "success",
                        timer: 1000,
                        buttons: false,
                    })
                        .then(() => {
                            location.reload();
                        })
                }
            }
        });
}


function SwitchUserStatus(id, action) {
    switch (action) {
        case 'false':
            swal({
                title: "Activate User",
                text: activateUserConfirmationMsg,
                icon: "warning",
                buttons: {
                    cancel: {
                        text: "No",
                        visible: true,
                    },
                    confirm: {
                        text: "Yes",
                        className: "btn-danger",
                    },
                },
                dangerMode: false,
            })
                .then((willDelete) => {

                    if (willDelete) {
                        UpdateUserStatusRequest(id, action);
                    }
                    else {
                        location.reload();
                    }
                });
            break;
        case 'true':
            swal({
                title: "Deactivate user",
                text: deactivateUserConfirmationMsg,
                icon: "warning",
                buttons: {
                    cancel: {
                        text: "No",
                        visible: true,
                    },
                    confirm: {
                        text: "Yes",
                        className: "btn-danger",
                    },
                },
                dangerMode: false,
            })
                .then((willDelete) => {

                    if (willDelete) {
                        UpdateUserStatusRequest(id, action);
                    }
                    else {
                        location.reload();
                    }
                });
            break;
        default: break;
    }

}

function UpdateUserStatusRequest(id, action) {
    PostRequest('/Account/switchuserstatus', { userId: id, status: action })
        .then(function (response) {

            if (response.error) {
                swal("Error", serverErrorMsg, "error");
            } else {
                if (response) {
                    if (action == "true") {
                        swal({
                            title: "Success",
                            text: userDeactivatedMsg,
                            icon: "success",
                            timer: 1000,
                            buttons: false,
                        })
                            .then(() => {
                                location.reload();
                            })
                    }
                    else {
                        swal({
                            title: "Success",
                            text: userActivatedMsg,
                            icon: "success",
                            timer: 1000,
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


function formatPhoneNumber(input) {

    let value = input.value.replace(/\D/g, '');
    // Limit the input to 10 digits
    if (value.length > 10) { value = value.slice(0, 10); } // Format the number as (123) 456-7890
    const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // Update the input value with the formatted number
    input.value = formattedValue;
}

//#endregion USER MANAGEMENT BEGINS

//#region Controller run time report grid page js starts

function PropertySearchFilter(event) {
    var propId = event.target.value;
    $.post("/Reports/PropertiesSearchFilter", { propId: propId }, function (data, status) {
        if (status == "success") {
            $(".table-responsive").empty();
            $(".table-responsive").html(data);
        }
    });
}


function ExportReportPopup(event) {

    // Get the anchor element that was clicked
    var $clickedAnchor = $(event.currentTarget);

    // Extract the controller ID from the anchor link
    var controllerId = $clickedAnchor.attr('value-data');

    // Get the other necessary data from the table row
    var $clickedRow = $clickedAnchor.closest('tr');
    var propertyName = $clickedRow.find('td:eq(1)').text();
    var controllerName = $clickedRow.find('td:eq(0)').text();
    var startTime = $clickedRow.find('td:eq(5)').text();

    //set controllerID
    $('#Controller_hdn_Id').val(controllerId);
    $('#Controller_hdn_Name').val(controllerName);
    $('#Property_hdn_Name').val(propertyName);
    $('#startTime_hdn').val(startTime);

    var url = `/Reports/GetControllerPrograms?controllerId=${controllerId}`;
    $.get(url, function (data, status) {
        // Assuming data is an array
        if (Array.isArray(data)) {
            // Clear existing options
            $('#ControllerProgramSelectInput').empty();

            // Iterate over the data and create options
            data.forEach(function (item, index) {
                // Generate program character dynamically (A, B, C, D)
                const programChar = String.fromCharCode(65 + index); // 65 is the ASCII code for 'A'
                // Check if programName is null
                if (item.programName) {
                    $('#ControllerProgramSelectInput').append(
                        $('<option></option>').val(item.id).text(`Program ${programChar} - ${item.programName}`)
                    );
                } else {
                    $('#ControllerProgramSelectInput').append(
                        $('<option></option>').val(item.id).text(`Program ${programChar}`)
                    );
                }
            });
            //bind programs start timers
            var progrmsVM = data[0];
            if (progrmsVM != null) {
                $('#ProgramStartTimerSelectInput').empty();
                $('#ProgramStartTimerSelectInput').append(
                    $('<option></option>').val(progrmsVM.id).text(progrmsVM.programTimer1 + ' ' + progrmsVM.timer1Median),
                    $('<option></option>').val(progrmsVM.id).text(progrmsVM.programTimer2 + ' ' + progrmsVM.timer2Median),
                    $('<option></option>').val(progrmsVM.id).text(progrmsVM.programTimer3 + ' ' + progrmsVM.timer3Median)
                );
            }
        }
        $('#ExportControllerRuntimeReportPopup').modal('show');
    });
}


function EnableProgramStartTime(event) {
    // Get the selected value from the dropdown using the event parameter
    var selectedValue = event.target.value;

    var controllerId = $('#Controller_hdn_Id').val();

    var url = '/Reports/GetProgramsStartTimer';
    $.get(url, { controllerId: controllerId, programId: selectedValue }, function (data, status) {

        if (data) {
            $("#ProgramStartTimerSelectInput").empty();
            $("#ProgramStartTimerSelectInput").removeAttr('disabled');
            $('#ProgramStartTimerSelectInput').append(
                $('<option></option>').val(data.id).text(data.programTimer1 + ' ' + data.timer1Median),
                $('<option></option>').val(data.id).text(data.programTimer2 + ' ' + data.timer2Median),
                $('<option></option>').val(data.id).text(data.programTimer3 + ' ' + data.timer3Median)
            );
        }
        else {

        }
    });
}


function DownloadControllerRunTimeReport(event) {

    // Show the loader
    $('#Loader').show();

    var selectedProgram = $("#ControllerProgramSelectInput option:selected").text();
    var startTime = $("#ProgramStartTimerSelectInput option:selected").text();

    // Create a model object with the extracted data
    var controllerTimeDetailsVM = {
        Id: $('#Controller_hdn_Id').val(),
        PropertyName: $('#Property_hdn_Name').val(),
        ControllerName: $('#Controller_hdn_Name').val(),
        ProgramTimer1: startTime,
        ModelName: selectedProgram
    };

    // Make an AJAX request to get the file
    $.ajax({
        url: '/Reports/ExportControllerRunTimeReport', // URL to the action method
        type: 'POST',
        data: controllerTimeDetailsVM,
        success: function (data, textStatus, jqXHR) {
            // Check if the request was successful
            if (jqXHR.status === 200) {
                // Create a Blob from the response
                var blob = new Blob([data], { type: 'application/pdf' });

                // Get the filename from the Content-Disposition header
                var disposition = jqXHR.getResponseHeader('Content-Disposition');
                var filename = disposition.split('filename=')[1];
                filename = filename.replace(/"/g, ''); // Remove any quotation marks

                // Create a link element
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename; // Use the filename from the header

                // Trigger the download
                link.click();

                // Hide the loader after the download is triggered
                $('#ExportControllerRuntimeReportPopup').modal('hide');

                $('#Loader').hide();

                // Revoke the object URL after the download
                setTimeout(function () {
                    URL.revokeObjectURL(link.href);
                }, 100);
            } else {
                // Hide the loader in case of an error
                $('#Loader').hide();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('An error occurred!');
            // Hide the loader in case of an error
            $('#Loader').hide();
        },
        xhrFields: {
            responseType: 'blob' // Force the HTTP response to a Blob
        }
    });
}

//#endregion Controller run time report grid page js ends


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