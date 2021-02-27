// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: download;

const scripts = [
  {
    moduleName: "Install Scripts",
    url:"https://raw.githubusercontent.com/pxylen/abc_/master/scripts/Install%20Scripts.js",
   },
   {
     moduleName: "DmYY",
     url:"https://raw.githubusercontent.com/pxylen/abc_/master/scripts/DmYY.js",
   },
   {
    moduleName: "机场流量",
    url:"https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/VpnBoard.js",
   },
   {
    moduleName: "京豆k线1",
    url:"https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/JDDouK.js",
   },
   {
    moduleName: "京豆k线2",
    url:"https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/JDDouK.js",
   },
   {
    moduleName: "京豆k线3",
    url:"https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/JDDouK.js",
   },
   {
    moduleName: "京豆收支",
    url:"https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/JDDou.js",
   },
   {
    moduleName: "京豆收支2",
    url:"https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/JDDou.js",
   },
//   {
//    moduleName: "中国联通",
//    url:"https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/ChinaUnicom.js",
//   },
//   {
//    moduleName: "油管视频",
//    url:"https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/YouTube.js",
//   },
];
class YaYaInstall {
	constructor() {
		this.request = new Request("");
		this.files = FileManager.iCloud();
		this.rootPath = this.files.documentsDirectory();
		this.defaultHeaders = {
			Accept: "*/*",
			"Content-Type": "application/json",
		};
	}

	saveFileName = (fileName) => {
		const hasSuffix = fileName.lastIndexOf(".") + 1;
		return !hasSuffix ? `${fileName}.js` : fileName;
	};

	write = (fileName, content) => {
		let file = this.saveFileName(fileName);
		const filePath = `${this.rootPath}/${file}`;
		FileManager.iCloud().writeString(filePath, content);
		return true;
	};

	fetchUrlString = async ({ url, headers = {} }, callback = () => {}) => {
		this.request.url = url;
		this.request.method = "GET";
		this.request.headers = {
			...headers,
			...this.defaultHeaders,
		};
		const data = await this.request.loadString();
		callback(this.request.response, data);
		return data;
	};

	saveFile = async ({ moduleName, url }) => {
		const header = `// Variables used by Scriptable.
  // These must be at the very top of the file. Do not edit.
  // icon-color: deep-gray; icon-glyph: file-code;\n`;
		const content = await this.fetchUrlString({ url });
		const fileHeader = content.includes("icon-color") ? `` : header;
		this.write(`${moduleName}`, `${fileHeader}${content}`);
	};

	install = async () => {
		console.log("🤖更新开始!");
		for (const script of scripts) {
			await this.saveFile(script);
			console.log(script.moduleName + "：更新成功");
		}
		console.log("🤖更新结束!");
	};
}

await new YaYaInstall().install();