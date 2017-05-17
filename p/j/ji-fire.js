var ji;
console.log('in');
(function(){

    __ji = function(){
        this.works = [];
    }
    __ji.prototype.use = function(f){
        if (typeof f === 'function') this.works.push(f);
    }
    __ji.prototype.setData = function(data){
        this.data = data;
    }
    __ji.prototype.getData = function(){
        return this.data;
    }
    __ji.prototype.getwork = function(){
        if (this.works.length > 0){
            let work = this.works.splice(0, 1)[0];
            if (typeof work === 'function'){
                let result = work.call(null);
                if (Array.isArray(result)){
                    return result;                    
                }
            }else{
                //do nothing
                work = null;
            }
        }
    }
    __ji.prototype.ajax = function(query){
        $.ajax({
            url:query.url,
            method:query.method || 'post',
            data:query.data || {},
        }).done(function(msg){
            if (msg.ok){
                query.done(msg.result);
            }else{
                query.fail(msg.error);
            }
        }).fail(function(jqXHR, textStatus, error){
            query.fail({code:jqXHR.status, message:jqXHR.statusText});
        })        
    }
    __ji.prototype.fetch = function(url, data, query){
        if (!query) query = {};
        if (!query.credentials) query.credentials = 'same-origin';
        if (!query.method) query.method = 'POST';
        if (!query.redirect) query.redirect = 'error';
        query.headers = new Headers({
		    'Content-Type': 'application/json'
	    })
        query.body = JSON.stringify(data);
        return fetch(url, query).then(function(response){
            if (response.ok){
                return response.json();
            }
            throw {name:'' + response.status, message:response.statusText};
        });
    }
    __ji.prototype.load = function(url, data, query){
        if (!query) query = {};
        if (!query.credentials) query.credentials = 'same-origin';
        if (!query.method) query.method = 'POST';
        if (!query.redirect) query.redirect = 'error';
        query.headers = new Headers({
		    'Content-Type': 'application/json'
	    })
        
        query.body = JSON.stringify(data);
        return fetch(url, query).then(function(response){
            if (response.ok){
                return response.text();
            }
            throw {name:'' + response.status, message:response.statusText};
        });        
    }
    ji = new __ji();
    $(document).ready(function(){
        console.log("on ready");
        for(;;){
            console.log("start to work");
            var work = ji.getwork();
            if (Array.isArray(work)){
                if (work[0] == "listener"){
                    $(work[1]).on(work[2], work[3]);
                }
            }else{
                break;
            }
        }
    });
})();

