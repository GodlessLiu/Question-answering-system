<template>
    <div class="card">
        <div class="imgBx">
            <img :src="props.avatar">
        </div>
        <div class="content">
            <div class="details">
                <h2>{{props.name}}<br><span>{{props.description}}</span></h2>
                <div class="data">
                    <h3>342<br><span>Posts</span></h3>
                    <h3>120k<br><span>Followers</span></h3>
                    <h3>285<br><span>Following</span></h3>
                </div>
                <div class="actionBtn">
                    <button>Follow</button>
                    <button>Message</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
type cardType = {
    avatar:string;
    name:string;
    description:string;
}

const props = withDefaults(defineProps<cardType>(),{
    avatar: "https://w.wallhaven.cc/full/vq/wallhaven-vqmey3.jpg",
    name: "John",
    description: "learning and student"
})


</script>

<style scoped>
@import '../assets/styles/AnimatedProfileCard.css';
</style>