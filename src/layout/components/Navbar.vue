<template>
<!--<div class="navbar" :style="{'background-color': themeVal}">-->
<div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <ul class="nav">
        <!-- <li :class="menuType==='quality'? 'active' : ''" @click="change('quality')">质量管理</li> -->
        <li :class="menuType==='mold'? 'active' : ''" @click="change('mold')">模块</li>
        <li :class="menuType==='personnel'? 'active' : ''" @click="change('personnel')">组织</li>
        <li :class="menuType==='integration'? 'active' : ''" @click="change('integration')">集成</li>
        <!-- <li :class="menuType==='connect'? 'active' : ''" @click="change('connect')">对接</li> -->
        <!-- <li :class="menuType==='contract'? 'active' : ''" @click="change('contractAspx')">案例</li> -->
        <li :class="menuType==='flow'? 'active' : ''" @click="change('flowType')">流转</li>
        <!-- <li :class="menuType==='matter'? 'active' : ''" @click="change('matter')">事项</li> -->
        <li :class="menuType==='file'? 'active' : ''" @click="change('file')">文件</li>
    </ul>

    <!-- <div class="search"> -->
    <!-- <div class="search_box">
        <i class="el-icon-search" />
        <input type="text" class="search_input" placeholder="输入搜索名称">
    </div>-->
    <!-- <input type="button" value="搜索" class="search_btn"> -->
    <!-- </div> -->
    <div class="login_out fr">
        <el-button class="el-icon-switch-button" circle @click="logout" />
    </div>
    <div class="member fr">
        <div class="header_pic">
            <img src="./hh.png" />
        </div>
        <span>admin</span>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import Hamburger from "@/components/Hamburger";

export default {
    components: {
        Hamburger
    },
    computed: {
        ...mapGetters(["sidebar", "avatar", "device", "menuType", "themeVal"])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch("app/toggleSideBar");
        },
        async logout() {
            await this.$store.dispatch("user/logout");
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        },
        change(type) {
            this.$router.push({
                name: type
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.el-icon-switch-button {
    font-size: 20px;
    margin: 0;
    padding: 0;
    background: #fff;
    width: 24px;
    height: 24px;
}

input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #fff !important;
}

input::-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #fff !important;
}

input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #fff !important;
}

input::-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #fff !important;
}

@media screen and (max-width: 1024px) {
    .nav li {
        font-size: 12px;
        margin: 0;
        padding: 0 5px 10px 5px;
    }
}

@media screen and (min-device-width: 1024px) and (max-device-width: 1399px) {
    .navbar {
        height: 50px;
    }

    .nav {
        padding-top: 0px;
    }

    .navbar .hamburger-container {
        margin-top: 0px;
    }

    .nav li {
        font-size: 12px;
    }

    .search {
        width: 250px;
        margin-top: 10px;
    }

    .search_box {
        width: 200px;
        height: 30px;
    }

    .search i {
        margin: 5px 5px 0 5px;
    }

    .search_input {
        width: 150px;
        font-size: 12px;
    }

    .search_btn {
        font-size: 12px;
        margin-top: 7px;
    }

    .member {
        margin-top: 10px;
        padding-right: 10px;
        font-size: 12px;
    }

    .login_out {
        padding-top: 10px;
        padding-right: 10px;
        font-size: 12px;
    }

    .login_out i {
        font-size: 25px;
    }
}
</style>
