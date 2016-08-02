function showNotification(message, type) {
    $('.notifications').notify({
        type: type || 'success',
        message: {
            text: message
        }
    }).show();
}
