<template>
  <div class="container mx-[25%] my-[-10%] " id="login-box">

    <div class="form-container sign-up-container">
      <div >
        <!--        v-if="isSignUp"-->
        <h1 v-if="isSignUp">注册</h1>
        <h1 v-if="isAlterPassword">更改密码</h1>
        <div class="txt-one" >
          <input type="text" v-model="signUpUsername" maxlength="20">
          <span data-placeholder="Username" ></span>
        </div>

        <div class="txt-one ">
          <input type="email" v-model="signUpEmail" maxlength="20">
          <span data-placeholder="Email" ></span>
        </div>



        <div class="txt-one">
          <input type="password" v-model="signUpPassword" maxlength="20">
          <span :data-placeholder="alternativePassword" ></span>
        </div>
        <div class="txt-one">
          <input type="password" v-model="signUpConfirmPassword" maxlength="20">
          <span data-placeholder="Confirm Password" ></span>
        </div>
        <div class="flex ">
          <div class="txt-one w-[75%]">
            <input v-model="signUpVerify" maxlength="20">
            <span data-placeholder="Verify" ></span>
          </div>
          <span class="mx-auto h-[50px] hhh text-2xl" @click="isSignUp ? handleSignUp() : handleForgetPassword()">
              获取验证码
          </span>
        </div>

        <button @click="isSignUp ? handleActivate() : handleFindPassword();">注册</button>
      </div>

    </div>
    <div class="form-container sign-in-container">
      <div action="#">
        <h1>登录</h1>
        <div class="txt-one">
          <input type="email" v-model="signInUsername" maxlength="20">
          <span data-placeholder="Username" ></span>
        </div>
        <div class="txt-one">
          <input type="password" v-model="signInPassword" maxlength="20">
          <span data-placeholder="Password "></span>
        </div>
        <span class="ml-auto h-[50px] hhh text-2xl" @click="clearInputs();alterPassword()">忘记密码？</span>
        <button @click="handleSignIn()">登录</button>
      </div>
    </div>

    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>已有账号？</h1>
          <p>请使用您的账号进行登录</p>
          <button class="ghost" @click="signIn" >登录</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>没有账号?</h1>
          <p>立即注册加入我们，和我们一起开始旅程吧</p>
          <button class="ghost" @click="signUp();clearInputs()">注册</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {postActivate, postFindPassword, postForgetPassword, postSignIn, postSignUp} from "@/api/api.js";
import {compute} from "three/nodes";
import Cookies from 'js-cookie';
import {ToastActions, toast} from "vue3-toastify";
const isSignUp = ref(false);
const isAlterPassword = ref(false);
const signUpEmail = ref();
const forgetPasswordEmail = ref();
const signUpPassword = ref();
const forgetPasswordPassword = ref();
const signUpUsername = ref();
const forgetPasswordUsername = ref();
const signUpConfirmPassword = ref();
const forgetPasswordConfirmPassword = ref();
const signUpVerify = ref();
const forgetPasswordVerify = ref();
const signInUsername = ref();
const signInPassword = ref();
const alternativePassword = ref('Password')
const emit = defineEmits(['signInSuccess'])

const clearInputs=()=>{
  signUpUsername.value = "";
  signUpConfirmPassword.value = "";
  signUpVerify.value = "";
  signUpPassword.value="";
  signUpConfirmPassword.value="";
  signUpEmail.value = "";
}
async function handleSignIn() {
  try {

    const response = await postSignIn(signInUsername.value, signInPassword.value); // 调用 postLogin 函数发送登录请求
    console.log(response); // 打印登录请求的响应数据

    Cookies.set('username',signInUsername.value,{expires:7});
    Cookies.set('user_id',response.data.id);
    emit("signInSuccess");
    toast.success('登录成功')
    // 在这里可以根据后端返回的数据进行相应的处理，例如跳转到登录成功后的页面等
  } catch (error) {

    if(error.response.data.message=='用户未注册'){
      toast.error('用户未注册')
    }
    if(error.response.data.message=='密码错误'){
      toast.error('密码错误')
    }
    console.error('登录失败:', error); // 打印登录失败的错误信息
    // error.response.data.message[0]
  }
}
async function handleSignUp() {
  try {
    console.log(signUpUsername.value);
    const response = await postSignUp(signUpUsername.value, signUpPassword.value,signUpConfirmPassword.value,signUpEmail.value);
    console.log(response);

  } catch (error) {
    console.error('登录失败:', error);
  }
}
async function handleForgetPassword() {
  try {
    const response = await postForgetPassword(signUpUsername.value, signUpPassword.value,signUpConfirmPassword.value,signUpEmail.value); // 调用 postLogin 函数发送登录请求
    console.log(response); // 打印登录请求的响应数据
    // 在这里可以根据后端返回的数据进行相应的处理，例如跳转到登录成功后的页面等
  } catch (error) {
    console.error('登录失败:', error); // 打印登录失败的错误信息
  }
}
async function handleActivate() {
  try {
    const response = await postActivate(signUpUsername.value,signUpEmail.value,signUpVerify.value); // 调用 postLogin 函数发送登录请求
    console.log(response); // 打印登录请求的响应数据
    // 在这里可以根据后端返回的数据进行相应的处理，例如跳转到登录成功后的页面等
  } catch (error) {
    console.error('登录失败:', error); // 打印登录失败的错误信息
  }
}
async function handleFindPassword() {
  try {
    const response = await postFindPassword(signUpUsername.value,signUpPassword.value,signUpConfirmPassword.value,signUpEmail.value,signUpVerify.value); // 调用 postLogin 函数发送登录请求
    console.log(response); // 打印登录请求的响应数据
    // 在这里可以根据后端返回的数据进行相应的处理，例如跳转到登录成功后的页面等
  } catch (error) {
    console.error('登录失败:', error); // 打印登录失败的错误信息
  }
}
const handleFocus = (event) => {
  event.target.classList.add('focus');
};

const handleBlur = (event) => {
  if (event.target.value === '') {
    event.target.classList.remove('focus');
  }
};

const signUp = () => {
  isSignUp.value = true;
  isAlterPassword.value = false;
  const loginBox = document.getElementById('login-box');
  if (loginBox) {
    loginBox.classList.add('right-panel-active');
  }
};

const signIn = () => {


  const loginBox = document.getElementById('login-box');
  if (loginBox) {
    loginBox.classList.remove('right-panel-active');
  }
};
const alterPassword = () => {
  isSignUp.value = false;
  isAlterPassword.value = true;
  const loginBox = document.getElementById('login-box');
  if (loginBox) {
    loginBox.classList.add('right-panel-active');
  }
};

onMounted(() => {
  const inputs = document.querySelectorAll('.txt-one input');
  inputs.forEach(input => {
    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);
  });
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}


h1 {
  font-weight: bold;
  margin: 0;
}
p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .5px;
  margin: 20px 0 30px;
}
span {
  font-size: 12px;
}

.container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;

}

.form-container > div {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  text-align: center;
}


.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social-container a:hover {
  background-color: #eee;

}
button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background: #ff4b2b;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:active {
  transform: scale(.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}
.txt-one {
  border-bottom: 2px solid #adadad;
  position: relative;
  margin: 10px 0;
}

.txt-one input {
  font-size: 15px;
  color: #333;
  border: none;
  width: 100%;
  outline: none;
  padding: 0 3px;
  height: 35px;
  z-index: 1;
}

.txt-one span::before {
  content: attr(data-placeholder);
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  transition: .5s;
  z-index: 0;

}
.txt-one span::after {
  content: '';
  position: absolute;
  left: 0%;
  top: 100%;
  width: 0%;
  height: 2px;
  background-image: linear-gradient(120deg,#3498db,#8e44ad);
  transition: .5s;
}

.focus + span::before {
  top: -5px;
}

.focus + span::after {
  width: 100%;
}



.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all .6s ease-in-out;
}

.form-container button {
  background: linear-gradient(120deg, #3498db, #8e44ad);
  border: none;
  background-size: 200%;
  color: #fff;
  transition: .5s;
}

.form-container button:hover {
  background-position: right;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.sign-in-container form a {
  position: relative;
  left: 100px;
}
.alter-password-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.alter-password-container form a {
  position: relative;
  left: 100px;
}
.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}
.sign-up-container button {
  margin-top: 20px;
}
.overlay-container {
  position:absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform .6s ease-in-out;
  z-index: 100;
}
.overlay {
  background-image: linear-gradient(120deg,#3498db,#8e44ad);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}
.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}
.overlay-right {
  right: 0;
  transform: translateY(0);

}

.overlay-left {
  transform: translateY(-20%);
}

.container.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

.container.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}
.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}
.container.container.right-panel-active .overlay {
  transform: translateX(50%);
}
.container.container.right-panel-active .overlay-left {
  transform: translateY(0);
}
.container.container.right-panel-active .overlay-right {
  transform: translateY(20%);
}

</style>
