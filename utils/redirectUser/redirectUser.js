export const redirectUser = function (ctx, location) {
	// console.log("funcion redirect user", ctx);
	if (ctx.res) {
		ctx.res.writeHead(302, { Location: location });
		ctx.res.end();
	} else {
		Router.push(location);
	}
};
