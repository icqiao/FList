import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { FileList } from './src/node/index.js'
import { githubReleasesFilesAnalysis } from "./src/node/analysis/githubReleasesFilesAnalysis/index.js";
import { cloudflarePagesDownProxy } from "./src/node/proxy/cloudflarePagesDownProxy/index.js";
import { fileUrlTreeAnalysis } from "./src/node/analysis/fileUrlTreeAnalysis/index.js";
import { huggingFaceDatasetsAnalysis } from "./src/node/analysis/huggingFaceDatasetsAnalysis/index.js";
import { vercelDownProxy } from './src/node/proxy/vercelDownProxy/index.js';
import { netlifyDownProxy } from './src/node/proxy/netlifyDownProxy/index.js';
import { giteeReleasesFilesAnalysis } from './src/node/analysis/giteeReleasesFilesAnalysis/index.js';
import { githubReposAnalysis } from './src/node/analysis/githubReposAnalysis/index.js';
import { giteeReposAnalysis } from './src/node/analysis/giteeReposAnalysis/index.js';
 

/**
 * 站点配置文件，没有注释的选项如果不知道有什么作用不建议修改，有注释的选项可以根据注释修改
 * */
export default defineUserConfig({
  bundler: viteBundler(),
  pagePatterns: [],
  lang: 'zh-CN',
  public: `./public`,
  // 网站标题，标题颜色可在 src/client/css/main.css 中修改
  title: 'iPan',
  // 网站的简介，有助于搜索引擎收录
  description: 'iPan - pan for isscc.xyz',
  // 页面 <head> 标签内添加的额外标签。 不要修改/logo.png可以替换掉这个文件，删除logo.png会导致构建出错。
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  // 页面预加载，所有其它页面所需的文件都会被预拉取。这对于小型站点来说是十分有帮助的，因为它会大大提升页面切换的速度。但是在你的网站有很多页面时不建议你这么做。
  // 简单来说就是，如果你的文件不多就可以打开这个选项，可以大大提高页面切换的速度，如果文件非常多就不建议打开。建议超过100个文件就不要打开这个选项。
  shouldPrefetch: true,
  // 主题配置 FileList 是 vuepress 的一个主题，文件展示的功能全部由这个主题提供。
  theme: FileList([
    {
      mountPath: "/",
      analysis: githubReleasesFilesAnalysis({ user: "icqiao", repository: "file" }),
      // 下载代理配置,支持多个平台，参考:https://jjaw.cn/2024/8/3/flist-config-porxy/
      // 这个是为了解决github的国内下载慢的问题，和跨域问题，建议配置，不然pdf，txt，md等文件因为跨域无法预览
      // 如果你使用的不是 cloudflare Pages 部署需要删掉这一行，因为如果不是cloudflare Pages部署，这个代理是无法正常工作的
      downProxy: cloudflarePagesDownProxy(),
    },
    {
      mountPath: "/",
      // 这里使用 fileUrlTreeAnalysis 文件放到对应的文件路径中
      analysis: fileUrlTreeAnalysis({
        "/硕士上课/数学物理方法/数学物理方法.pdf": "https://psv4.userapi.com/s/v1/d/hOVPJIShgbCtScMh6KH-lZO3sSGxj2L6XYP8YZ1LblfG9ZY3jwW0FnH8Lrbfw4MfAFrMYIyejwJS4T7uYPYfFxT25sOPqmez9LmC2uKW2W_Sz_WR/12298__25968__23398__29289__29702__26041__31243__12299__26446__26126__22855.pdf",
        "/硕士上课/数学物理方法/数学物理方程答案.pdf": "https://psv4.userapi.com/s/v1/d/bN1d0D95BBXSQxUJduaGF-jX9_cbs0pwankQPdJAOTS4oi4xDB5tQc_ZWWtNiWn6KDY9MCEYEgXN7bUTLkn5abf268AlKM2j4r9li_mNdSHnf1Cy/25968__23398__29289__29702__26041__31243__31572__26696__20840.pdf",
        "/硕士上课/矩阵理论/矩阵理论.pdf": "https://psv4.userapi.com/s/v1/d/bCxB3ytrXOHKOu6A6nLlj0Iy25Cbb6JrClhchYoly8Te-v9DCtAjjF5xv_AynFaUo3DLN-azlmQb46VbmK8GEtowkNlil_-4GpU9I6YSsEfUoE7z/30697__38453__29702__35770___25945__26448__30005__23376__29256.pdf",
        "/硕士上课/数学物理方法/矩阵理论学习指导.pdf": "https://psv4.userapi.com/s/v1/d/PtM1ixC0cGLWrYgCzPKDxDJpeSjEgPD51dApozb-rzzz04Ua3ibmaBC0iSAb_gs-R_77vjf0ttMilG_fOjLiV6W6EtohEtBlAf-463jPxyb2PIUj/30697__38453__29702__35770__23398__20064__25351__23548.pdf"
      }),
    },
  ])
})
