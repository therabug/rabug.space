declare namespace Cloudflare {
	interface Env {
		ASSETS: Fetcher;
	}
}
interface Env extends Cloudflare.Env {}
