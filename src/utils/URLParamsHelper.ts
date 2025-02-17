export default class URLParamsHelper {
	private params: URLSearchParams;

	constructor(initialParams?: Record<string, string | number | undefined>) {
		this.params = new URLSearchParams();

		if (initialParams) {
			Object.entries(initialParams).forEach(([key, value]) => {
				// ตรวจสอบค่า value หากเป็น null หรือ undefined จะไม่เพิ่มเข้าไป
				if (value !== null && value !== undefined) {
					this.params.append(key, String(value));
				}
			});
		}
	}

	// เพิ่มค่าใหม่
	setParam(key: string, value: string | number) {
		this.params.set(key, String(value));
	}

	// ดึงค่าตาม key
	getParam(key: string): string | null {
		return this.params.get(key);
	}

	// ลบค่าตาม key
	deleteParam(key: string) {
		this.params.delete(key);
	}

	// ดึงค่าเป็น object
	getAllParams(): Record<string, string> {
		return Object.fromEntries(this.params.entries());
	}

	// ดึงค่าเป็น string สำหรับ query URL
	toString(): string {
		return this.params.toString();
	}
}
