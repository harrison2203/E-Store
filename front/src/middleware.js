export default function middleware(request) {
	let cookieToken = request.cookies.get('access_token');
	let cookieRole = request.cookies.get('user_info');
	let parseCookie = "";

	const gestionCookies = () => {
		if (cookieRole === undefined && cookieToken === undefined) {
			console.log('undefined cookies');
			} else {
			console.log("parseCookie", parseCookie);
			console.log("cookieToken", cookieToken);
			return parseCookie = JSON.parse(cookieRole.value);
		}
	}

	gestionCookies()

	if (!cookieToken && (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/account'))) {
		return Response.json(
			{ success: false, message: 'authentication failed' },
			{ status: 401 }
		)
	} else if (parseCookie.hasOwnProperty('is_super_user') && parseCookie['is_super_user'] === true && request.nextUrl.pathname.startsWith('/account')) {
		return Response.json(
			{ succes: false, message: 'you are connected as admin' },
			{ status: 401 }
		)
	} else if(parseCookie.hasOwnProperty('is_super_user') && parseCookie['is_super_user'] === false && request.nextUrl.pathname.startsWith('/admin')) {
		return Response.json(
			{ succes: false, message: 'you are connected as user' },
			{ status: 401 }
		)
	}
};