function showNotification(message, type) {
    $('.notifications').notify({
        type: type || 'success',
        closable: false,
        message: {
            text: message
        }
    }).show();
}
