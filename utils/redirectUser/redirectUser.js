import Router from "next/router";
export const redirectUser = function (ctx, location) {
	// console.log("funcion redirect user", ctx);
	console.log("CTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", ctx.req);
	if (ctx.req) {
		ctx.res.writeHead(302, { Location: location });
		ctx.res.end();
	} else {
		Router.push(location);
	}
};
