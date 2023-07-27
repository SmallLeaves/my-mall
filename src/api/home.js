import http from "@/utils/http"
console.log("http",http)
export const homeData = () => {
	const url = "api/v2/diy/get_diy/moren";
	return http.get(url);
}