# Rick and Morty Wiki

基于 Taro 的跨端应用，支持微信小程序端、React Native 端和 H5 端。在这里可以查看几乎所有在《瑞克和莫蒂》中出现的人物，外加专为铁粉准备的小游戏。

灵感和基础数据来源于：[afuh/rick-and-morty-api](https://github.com/afuh/rick-and-morty-api)

Android APK：[下载地址](https://rickandmortywiki.oss-cn-beijing.aliyuncs.com/RN%20wiki.apk)

IOS APP：暂无

H5静态页面：[预览地址](https://rnwiki.cavano.vip)

**React Native 端截图**：

<table>
  <tr>
    <td><img src="https://rickandmortywiki.oss-cn-beijing.aliyuncs.com/rn/rn1.jpg"></td>
    <td><img src="https://rickandmortywiki.oss-cn-beijing.aliyuncs.com/rn/rn2.jpg"></td>
    <td><img src="https://rickandmortywiki.oss-cn-beijing.aliyuncs.com/rn/rn3.jpg"></td>
    <td><img src="https://rickandmortywiki.oss-cn-beijing.aliyuncs.com/rn/rn4.jpg"></td>
  </tr>
 </table>

**微信小程序端截图**：

<table>
  <tr>
    <td><img src="https://rickandmortywiki.oss-cn-beijing.aliyuncs.com/weapp/weapp1.jpg"></td>
    <td><img src="https://rickandmortywiki.oss-cn-beijing.aliyuncs.com/weapp/weapp2.jpg"></td>
    <td><img src="https://rickandmortywiki.oss-cn-beijing.aliyuncs.com/weapp/weapp3.jpg"></td>
    <td><img src="https://rickandmortywiki.oss-cn-beijing.aliyuncs.com/weapp/weapp4.jpg"></td>
  </tr>
 </table>

**H5 端**：和RN、小程序几乎一摸一样，就不贴图了～

## 技术

- 语言：TypeScript
- 框架：[Taro](https://taro-docs.jd.com/taro/docs/README)、React(Hook)

支持状态：

- [x] React Native
- [x] 微信小程序
- [x] H5

## 规划

- [x] 基础角色/地点/剧集图鉴
- [x] Dead or Alive Game
- [ ] 其他图鉴（音乐等）

## 开发

首先将代码克隆到本地，并安装好依赖：

```
$ git clone ...
$ cd rick-and-morty-wiki
$ npm install
```

### 编译到微信小程序

直接运行：

```
$ npm run dev
```

更多信息请参考[Taro 文档](https://taro-docs.jd.com/taro/docs/GETTING-STARTED#%E7%BC%96%E8%AF%91%E8%BF%90%E8%A1%8C)。

### 编译到 React Native

在进行以下操作之前，请确保自己的电脑上安装了正确的 RN 环境。参考：[react-native 中文网](https://www.react-native.cn/docs/environment-setup)。如果在编译的过程中遇到了问题，请参考[Taro 文档](https://taro-docs.jd.com/taro/docs/react-native#%E5%BC%80%E5%8F%91)。

#### 1. 克隆 native-shell 到项目内

将[rick-and-morty-wiki/RMwiki-native-shell](https://github.com/rick-and-morty-wiki/RMwiki-native-shell)克隆到项目根目录内。

```
$ git clone https://github.com/rick-and-morty-wiki/RMwiki-native-shell.git
```

#### 2. 为 native-shell 安装依赖

按顺序执行下面的命令：

```
$ cd taro-native-shell
$ npm install
$ cd ios & pod install
```

#### 3. 编译到指定平台（快捷指令）

cd 到项目根目录下，拆分一个终端（或新建一个终端）。以**编译到 Android 端**为例，首先在第一个终端内运行：

```
$ npm run and1
```

等待几秒。当出现 `Welcome to React Native!` 后，在第二个终端内运行：

```
$ npm run and2
```

之后第一个终端会开始编译。在进行下一步操作之前，请确保自己的电脑连接了一台可调式的设备（或安装了虚拟机）。等待编译完成后，在第二个终端内运行：

```
$ npm run and3
```

这一步的等待时间可能较长，也比较容易出现报错。通常情况下等待的时间在半分钟左右，但第一次编译可能会有几分钟。编译成功后，会自动将 app 安装在电脑连接的调试设备（或虚拟机）上。

**编译到 IOS 端**的步骤与 Android 基本一致，不同之处在于运行的三行命令需要更换为：

```
$ npm run ios1
$ npm run ios2
$ npm run ios3
```

</br>
</br>

**_以上是编译到指定平台的快捷方法，你也可以采用 taro 原始的方法进行编译，以下是编译步骤：_**

1. 进入 Taro RN 编译预览模式

```
$ npm run dev:rn
```

2. 构建目标平台

   > 上一步编译完成后，在浏览器请求下方 url（二选一）  
   > Android: http://127.0.0.1:8081/index.bundle?platform=android&dev=true  
   > IOS: http://127.0.0.1:8081/index.bundle?platform=ios&dev=true

3. 启动 React Native 项目（Android）

```
$ npm run android
```

4. 启动 React Native 项目（IOS）

```
$ npm run ios
```
