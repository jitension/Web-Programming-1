(function($) {
    // Let's start writing AJAX calls!

    var myNewTaskForm = $("#server-form"),
        newNoteNameInput = $("#note-title"),
        newDueDateInput = $("#due-date"),
        newSummaryArea = $("#summary"),
        newBodyArea = $("#note-body"),
        formAlert = $("#form-alert"),
        nextForm = $('#nextform');

    nextForm.submit(function(event) {
        event.preventDefault();
        let newtitle = $('#noteTitle');
        let dueDate = $('#dueDate');
        let summary = $('#noteSummary');
        let body = $('#noteBody');

        var requestConfig = {
            method: "POST",
            url: "/next/nextnode",
            contentType: 'application/json',
            data: JSON.stringify({
                date: dueDate.attr("value")
            }),
            success: function(response) {
                if (response.success == false) {
                    alert("No More Records!")
                    return;
                }
            },

            error: function(error) {
                alert("error");
                return;
            }
        };

        $.ajax(requestConfig).then(function(response) {
            
            newtitle.text("Title: " + response.data.noteTitle).css("font-weight","Bold");
            dueDate.text("Due Date: " + response.data.dueDate);
            summary.text("Summary: " + response.data.summary);
            body.text('Body: ' + response.data.noteBody);

            dueDate.attr('value', response.data.dueDate);
            console.log(dueDate.attr("value"))
        });
    }),

        myNewTaskForm.submit(function(event) {
            event.preventDefault();

            var newNoteName = newNoteNameInput.val();
            var newDueDate = newDueDateInput.val();
            var newSummary = newSummaryArea.val();
            var newBody = newBodyArea.val();
            var newContent = $("#new-content");


            formAlert.addClass('hidden');
            formAlert.text('');

            if (!newNoteName || !newDueDate || !newSummary || !newBody) {
                formAlert.text('You must provide a key name');
                formAlert.removeClass('hidden');
                return;
            }

            if (newNoteName && newDueDate && newSummary && newBody) {
                var requestConfig = {
                    method: "POST",
                    url: "/new/save",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        noteTitle: newNoteName,
                        dueDate: newDueDate,
                        summary: newSummary,
                        noteBody: newBody
                    }),
                    success: function(response) {
                        if (response.redirect !== undefined && response.redirect) {
                            window.location.href = response.redirect_url;
                        }
                    },
                    error: function(error) {
                        alert("error");
                        newContent.html("Unable to add Note in file!!");
                    }
                };

                $.ajax(requestConfig);
            }
        });
})(window.jQuery);