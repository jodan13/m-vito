class TsAppService {
  text: any;
  constructor(text) {
    this.text = text;
  }
  log() {
    console.log("[App service]:", this.text);
  }
}
export default TsAppService;
