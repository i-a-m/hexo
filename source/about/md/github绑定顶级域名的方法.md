在github的help页面有介绍如何绑定域名 - [About custom domains for GitHub Pages sites](https://help.github.com/articles/about-custom-domains-for-github-pages-sites/)

下面简单写一下我将Hexo + Github Pages绑定顶级域名的方法：

1. 在自己网站项目repo的根目录添加CNAME，里面的内容为域名不要http以及www等前缀，只需写入域名本身，例如

   ```
   xxx.com
   ```

   ** 如果是直接在GitHub网页上添加文件的话，会遇到一个问题就是在通过`hexo g -d`之后hexo会把根目录下的CNAME文件删除。

   所以要把CNAME文件添加到`/source`目录下，这样`hexo g -d`之后hexo会自动把CNAME复制到`/puclic`目录下然后将`/public`路径下的内容进行复制并push到远程`master`分支的根目录下。

   ​

2. 添加DNS Service记录
   设置两个A记录，分别是@和www，ip地址填

   ```
   192.30.252.153
   ```

   | 主机记录 | 记录类型 |      记录值       |
   | :--: | :--: | :------------: |
   |  @   |  A   | 192.30.252.153 |

   | 主机记录 | 记录类型 |      记录值       |
   | :--: | :--: | :------------: |
   | www  |  A   | 192.30.252.153 |

