
    $(document).on('keypress', '.inputTextBox', function (event) {
        var regex = new RegExp("^[a-zA-Z ]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });

    $(document).on('keypress', '.numbervalue', function (event) {
        var regex = new RegExp("^[0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });

    $(document).ready(function () {
        $('input,select,textarea').change(function () {
            var valueofelement = $(this).val();
            var id = $(this).attr('id');
            if (valueofelement != '' || valueofelement != '-1') {
                $("#" + id + "-error").remove();
            }
        });
    });



    function validateEmail(emailAddress) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(emailAddress)) {
            return true;
        } else {
            return false;
        }
    }


    function memberSubmit() {


        if (validateFormValue('member-form-id') == false) {
            var firstEmptyField = $("select.mandatoryvalue, input.mandatoryvalue,textarea.mandatoryvalue").filter(function () {
                return $(this).val() == null || $(this).val() == 'null' || $(this).val() == '' || $(this).val() == -1;
            }).first();

            if (firstEmptyField.length > 0) {
                firstEmptyField.focus();
                return false;
            }
            else
            {
                return true;
            }

        }
    }
    function submitVolunterreg() {


        if (validateFormValue('volunteer-form-id') == false) {
            var firstEmptyField = $("select.mandatoryvalue, input.mandatoryvalue,textarea.mandatoryvalue").filter(function () {
                return $(this).val() == null || $(this).val() == 'null' || $(this).val() == '' || $(this).val() == -1;
            }).first();

            if (firstEmptyField.length > 0) {
                firstEmptyField.focus();
            }

        } else {
            $('#volunterreg_submit').attr('disabled', 'disabled');
            $('.loader').show();
            var formData = new FormData($('#volunteer-form')[0]);
            console.log(formData);
            $.ajax({
                type: 'POST',
                url: 'sendmail-regvolunteer.php',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data);
                    if (data == 'success') {
                        $('.loader').hide();
                        $('#volunteer-form').hide();
                        $('#voluntaryregerrormsg').hide();
                        $('#voluntaryregsuccessmsg').show();
                        $('#anotherresponsevoluntaryreg').show();
                        setTimeout(() => {
                            $("html, body").animate({
                            scrollTop: 0
                        }, 1000);
                        }, 500);
                    } else{
                        $('.loader').hide();
                        $('#volunteer-form').hide();
                        $('#voluntaryregerrormsg').show();
                        $('#voluntaryregsuccessmsg').hide();
                        $('#anotherresponsevoluntaryreg').show();
                         setTimeout(() => {
                            $("html, body").animate({
                            scrollTop: 0
                        }, 1000);
                        }, 500);
                    }
                }
            });
        }
    }
    function submitInternship() {


        if (validateFormValue('internship-form-id') == false) {
            var firstEmptyField = $("select.mandatoryvalue, input.mandatoryvalue,textarea.mandatoryvalue").filter(function () {
                return $(this).val() == null || $(this).val() == 'null' || $(this).val() == '' || $(this).val() == -1;
            }).first();

            if (firstEmptyField.length > 0) {
                firstEmptyField.focus();
            }

        } else {
            $('#submit-internship').attr('disabled', 'disabled');
            $('.loader').show();
            var formData = new FormData($('#internship-form')[0]);
            console.log(formData);
            $.ajax({
                type: 'POST',
                url: 'sendmail-internship.php',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data);
                    if (data == 'success') {
                        $('.loader').hide();
                        $('#internship-form').hide();
                        $('#internshiperrormsg').hide();
                        $('#internshipsuccessmsg').show();
                        $('#anotherresponseinternshipreg').show();
                    } else{
                        $('.loader').hide();
                        $('#internship-form').hide();
                        $('#internshiperrormsg').show();
                        $('#internshipsuccessmsg').hide();
                        $('#anotherresponseinternshipreg').show();
                    }
                }
            });
        }
    }

    function submitDonar() {
        if (validateFormValue('donar-form-id') == false) {
            var firstEmptyField = $("select.mandatoryvalue, input.mandatoryvalue,textarea.mandatoryvalue").filter(function () {
                return $(this).val() == null || $(this).val() == 'null' || $(this).val() == '' || $(this).val() == -1;
            }).first();

            if (firstEmptyField.length > 0) {
                firstEmptyField.focus();
            }

        } else {
            $('#donar_submit').attr('disabled', 'disabled');
            $('.loader').show();
            var formData = new FormData($('#donar-form')[0]);
            console.log(formData);
            $.ajax({
                type: 'POST',
                url: 'sendmail-donar.php',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data);
                    if (data == 'success') {
                        $('.loader').hide();
                        $('#donar-form').hide();
                        $('#donarerrormsg').hide();
                        $('#donarsuccessmsg').show();
                        $('#anotherresponsedonar').show();
                    } else{
                        $('.loader').hide();
                        $('#donar-form').hide();
                        $('#donarerrormsg').show();
                        $('#donarsuccessmsg').hide();
                        $('#anotherresponsedonar').show();
                    }
                }
            });
        }
    }
    


    function validateFormValue(fieldset) {
        var validate = true;
        var fieldsetid = "#" + fieldset;
        $(fieldsetid + " input.mandatoryvalue").each(function () {
            var value = $(this).val();
            var id = $(this).prop('id');

            if (value == null || value == 'null' || value == '' || value == -1) {
                var title = $(this).prop('title');
                if (!title || title.length == 0) {
                    title = $(this).prop('name');
                }
                var message = "Kindly insert the " + title + ".";

                if (!$('#' + id + '-error').length) {
                    $(this).parent().append('<label id="' + id + '-error" for=' + id + ' class="error">' + message + '</label>');
                    $(this).focus();
                }

                validate = false;
            } else {
                // If the select element is not blank, remove any existing error messages
                $('#' + id + '-error').remove();
            }
        });
        $(fieldsetid + " select.mandatoryvalue").each(function () {
            var value = $(this).val();
            var id = $(this).prop('id');

            if (value == null || value == 'null' || value == '' || value == -1) {
                var title = $(this).prop('title');
                if (!title || title.length == 0) {
                    title = $(this).prop('name');
                }
                var message = "Kindly select the " + title + ".";

                if (!$('#' + id + '-error').length) {
                    $(this).parent().append('<label id="' + id + '-error" for=' + id + ' class="error">' + message + '</label>');
                    $(this).focus();
                }

                validate = false;
            } else {
                // If the select element is not blank, remove any existing error messages
                $('#' + id + '-error').remove();
            }
        });
        $(fieldsetid + " textarea.mandatoryvalue").each(function () {
            var value = $(this).val();
            var id = $(this).prop('id');

            if (value == null || value == 'null' || value == '' || value == -1) {
                var title = $(this).prop('title');
                if (!title || title.length == 0) {
                    title = $(this).prop('name');
                }
                var message = "Kindly insert the " + title + ".";

                if (!$('#' + id + '-error').length) {
                    $(this).parent().append('<label id="' + id + '-error" for=' + id + ' class="error">' + message + '</label>');
                    $(this).focus();
                }

                validate = false;
            } else {
                // If the select element is not blank, remove any existing error messages
                $('#' + id + '-error').remove();
            }
        });

        $(fieldsetid + " .emailid").each(function () {
            var value = $(this).val().trim();
            var id = $(this).prop('id');
            if (value.length > 0 && !validateEmail(value)) {
                var title = $(this).prop('title');
                if (!title || title.length == 0) {
                    title = $(this).prop('name');
                }
                var message = title + " is not valid";
                $(this).focus();
                if (!$('#' + id + '-error').length) {
                    $(this).parent().append('<label id="' + id + '-error" for=' + id + ' class="error">' + message + '</label>');
                    $(this).focus();
                }
                validate = false;
            }
        });

        return validate;


    }