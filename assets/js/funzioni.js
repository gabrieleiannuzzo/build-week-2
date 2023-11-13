class DataObject {
    constructor (url, apiKey, method = "GET", obj = {}) {
        this.url = url;
        this.apiKey = apiKey;
        this.method = method;
        this.obj = obj;
    }

    async fetchData () {
        const params = {
            method: this.method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": apiKey,
            },
        }

        if (this.method == "POST" || this.method == "PUT") params.body = JSON.stringify(this.obj);

        console.log(params)

        const response = await fetch(this.url, params);
        
        if (this.method == "GET") {
            const data = await response.json()
            return data;
        }
        return;
    }
}