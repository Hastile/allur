<template>
    <div class="container cropdiv">
        <div ref="cropArea" class="cropArea">
            <img ref="image" :src="image" @load="initializeCropper" />
        </div>
        <button @click="cropImage">Crop</button>
    </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
export default {
    name: "ImageCropper",
    props: {
        image: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            cropper: null,
            options: {
                aspectRatio: 1 / 1, // 자를 이미지 비율
                viewMode: 1,
                zoomable: false,
                background: false,
                guides: false,
                highlight: false,
                autoCropArea: 1
            }
        };
    },
    watch: {
        image: function () {
            this.initializeCropper()
        }
    },
    methods: {
        initializeCropper() {
            if (this.cropper) {
                this.cropper.destroy();
            }
            if (this.image !== '') {
                this.cropper = new Cropper(this.$refs.image, this.options);
            }
        },
        cropImage() {
            const croppedCanvas = this.cropper.getCroppedCanvas();
            const croppedImage = croppedCanvas.toDataURL("image/jpeg");
            this.$emit("cropImage", croppedImage);
        },
    },
};
</script>

<style>
.cropArea {
    margin: 10px;
    height: 90%;
    position: relative;
}

.container.cropdiv {
    width: 90vw;
    height: 90vh;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.cropArea img {
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.cropper-crop-box, .cropper-view-box {
    border-radius: 50%;
}

.cropper-view-box {
    box-shadow: 0 0 0 1px #39f;
    outline: 0;
}
</style>
