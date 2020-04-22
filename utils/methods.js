function getRequest(req) {
    var context = {};
    context.method = req.method;
    context.path = req.path;
    context.hostname = req.hostname;
    context.orig_url = req.originalUrl
    context.qs = req.query;
    context.user_ip = {ip: req.ip, fwd: req.headers["x-forwarded-for"] || "none"};
    context.cookies = req.cookies;
    context.header = req.headers;

    return context;
}

module.exports = getRequest;