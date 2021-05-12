<template>
<div class="">
    產品列表
    <form class="" @submit="formSubmit" enctype="multipart/form-data">
        <div class="">
            <label class="">語言選擇</label>
            <select  v-model="lang">
                <option>請選擇語系</option>
                <option value="0">中文</option>
                <option value="1">英文</option>
                <option value="2">德文</option>
                <option value="3">日文</option>
            </select><br/>
            款式<select v-model="type">
                <option value="0">單色款</option>
                <option value="1">圖案款</option>
            </select>
            尺寸
            <select  v-model="size">
                <option>請選擇尺寸</option>
                <option value="0">幼兒</option>
                <option value="1">兒童</option>
                <option value="2">成人</option>
            </select><br />
            <label>圖片上傳</label><br />

                照片<input type="file" class="form-control" ref="file" multiple @change="onFileChange"/><br />

            <div v-if="preview_list.length" class="img-list">
                <div v-for="(item, index) in preview_list" :key="index">
                    <img :src="item"  />
                </div>
            </div>
            <button>上傳</button>
                產品品名<input type="text"  v-model="title"/><br/>
                產品材質<input type="text" v-model="material"/><br/>
                產品規格<textarea rows="4" cols="50"  v-model="spec"/><br/>
                口罩用途<input type="text" v-model="used"/><br/>
                適用情況<input type="text"  v-model="situation"/><br/>
                保存期限<input type="text"  v-model="dueday"/><br/>
                口罩顏色<input type="text"  v-model="color"/><br/>

                保存方式<input type="text"  v-model="storageMethod"/><br/>
                盒裝數量<input type="text"  v-model="quantity"/><br/>

            <button type="button" @click.prevent="saveHandler">儲存</button>

        </div>
    </form>
</div>
</template>
<script>

import axios from "axios";
export default {
    name: "ProductList",
    data(){
        return {
            lang:"",
            type:"",
            size:"",
            title:"",
            material:"",
            spec:"",
            used:"",
            situation:"",
            dueday:"",
            color:"",
            storageMethod:"",
            quantity:"",
            images:[],
            preview_list:[],
        }
    },
    methods: {
          onFileChange(e) {
              let selectedFile = e.target.files;

              if (!selectedFile.length) {
                  return false;
                  }

            for (let i = 0; i < selectedFile.length; i++) {
                var reader = new FileReader();
                reader.onload = e => {
                    this.preview_list.push(e.target.result);
                };
                this.images.push(selectedFile[i]);
                reader.readAsDataURL(selectedFile[i]);
            }
        },
        formSubmit(e) {
            e.preventDefault();

            const config = {
                headers: { "content-type": "multipart/form-data" }
            };

            let formData = new FormData();
            for (let i = 0; i < this.images.length; i++) {
                let file = this.images[i];
                formData.append("images[" + i + "]", file);

            }

            let lang = this.lang;
            let type = this.type;
            let size = this.size;
            let title = this.title;
            let material = this.material;
            let spec = this.spec;
            let used = this.used;
            let dueday = this.dueday;
            let color = this.color;
            let storageMethod = this.storageMethod;
            let quantity = this.quantity;
            let situation = this.situation;

            const data1 = {
                lang: lang,
                size: size,
                type: type,
                title: title,
                material: material,
                spec: spec,
                used: used,
                dueday: dueday,
                color: color,
                storageMethod: storageMethod,
                quantity: quantity,
                situation: situation
            }
            formData.append('data11',data1);

            // formData.append("productID", productID);
            // formData.append("customerCode", customerCode);
             axios
                .post(
                    "http://127.0.0.1:8000/api/product/store",
                    formData,
                    config
                )
                .then(function(response) {
                    console.log('response:' + response);
                    // currentObj.success = response.data.success;
                })
                .catch(function(error) {
                    // currentObj.output = error;
                    console.log(error);
                });
        },
        saveHandler(){
            let lang = this.lang;
            let type = this.type;
            let size = this.size;
            let title = this.title;
            let material = this.material;
            let spec = this.spec;
            let used = this.used;
            let dueday = this.dueday;
            let color = this.color;
            let storageMethod = this.storageMethod;
            let quantity = this.quantity;
            let situation = this.situation;

            const data = {
                lang: lang,
                size: size,
                type: type,
                title: title,
                material: material,
                spec: spec,
                used: used,
                dueday: dueday,
                color: color,
                storageMethod: storageMethod,
                quantity: quantity,
                situation: situation
            }
            console.log(data);

            // console.log("lang:" + lang);
            // console.log("size:" + size);
            // console.log('type' + type);
            // console.log("title:" + title);
            // console.log("material:" + material);
            // console.log("spec:" + spec);
            // console.log("used:" + used);
            // console.log("dueday:" + dueday);
            // console.log("color:" + color);
            // console.log("storageMethod:" + storageMethod);
            // console.log("quantity:" + quantity);
            // console.log("situation" + situation);
        }
    }

};
</script>

<style lang="scss" scoped>
.img-list {
    display: flex;
    margin: 10px 0;
    flex-wrap: wrap;
    img {
        height: 150px;
        margin-right: 3px;
        margin-bottom: 3px;
        max-width: inherit;
    }
}
</style>
