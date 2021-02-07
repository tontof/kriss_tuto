<?php
function display($data, $secure = true) {
    if (empty($data) || !is_array($data)) {
        var_dump($data);
    } else {
        $str = print_r($data, true);
        if ($secure) {
            $str = htmlspecialchars($str);
        }
        echo str_replace("  ", " ", nl2br($str, false));
    }
}
?>

<table>
  <tr>
    <th><a href="./form.php?filename=form_get">GET</a></th>
    <th><a href="./form.php?filename=form_post">POST</a></th>
    <th>REQUEST</th>
    <th><a href="./form.php?filename=form_post_files">FILES</a></th>
    <th>COOKIE <a href="javascript:void%20function(){(function(e,o){var%20t=(new%20Date).valueOf(),n=%22%3Clabel%3E%3Ccode%3E{name}=%3C/code%3E%3Cinput%20id='Cookie{name}{index}{id}'%20type='text'%20value='{value}'%20style='font-family:monospace;width:50%25'%20/%3E%3C/label%3E%3Cinput%20type='button'%20value='Update'%20onclick='window.UpdateCookie{id}(\%22{name}\%22,%20{index});'%20/%3E%3Cinput%20type='button'%20value='Delete'%20onclick='window.DeleteCookie{id}(\%22{name}\%22);'%20/%3E%3Cbr/%3E%22,i=function(e,o,i){return%20e=e.replace(/'/,%22%26apos;%22),o=o.replace(/'/,%22%26apos;%22),n.replace(/\{id\}/gi,t).replace(/\{name\}/gi,e).replace(/\{value\}/gi,o).replace(/\{index\}/gi,i)},a=function(e,t){o.cookie=e+%22=%22+t},l=function(){var%20n=%22%22;if(o.cookie%26%26%22%22!==o.cookie){var%20a=o.cookie.split(%22;%22);for(y=0,C=a.length;C%3Ey;y++){var%20l=a[y].split(%22=%22),c=l[0].replace(/^\s+/,%22%22),u=e.decodeURIComponent(a[y].substring(l[0].length+1));n+=i(c,u,y)}}n+=%22%3Cinput%20id='CookieNewName%22+t+%22'%20type='text'%20value=''%20placeholder='name'%20style='font-family:monospace;width:25%25'%20/%3E=%3Cinput%20id='CookieNewValue%22+t+%22'%20type='text'%20value=''%20placeholder='value'%20style='font-family:monospace;width:50%25'%20/%3E%3Cinput%20type='button'%20value='Add'%20onclick='window[\%22SaveCookie%22+t+'%22](document.getElementById(%22CookieNewName'+t+'%22).value,%20document.getElementById(%22CookieNewValue'+t+%22\%22).value);'%20/%3E%22,d.innerHTML=n,p.appendChild(d)},d=o.createElement(%22div%22),p=o.getElementsByTagName(%22body%22)[0],c=new%20Date,u=%22%22,r=%22;%20domain=%22,m=%22;%20path=%22,v=o.domain.split(%22.%22),f=v[v.length-1],g=f,k=[%22%22,f],s=e.location.pathname.split(%22/%22),w=%22%22,h=[%22%22,%22/%22],y=0,C=0;for(c.setDate(c.getDate()-1),u=%22;%20expires=%22+c.toGMTString(),y=v.length-1;y--;)g=v[y]+%22.%22+g,k.push(g);for(y=1,C=s.length;C%3Ey;y++)w+=%22/%22+s[y],h.push(w);e[%22SaveCookie%22+t]=function(o,t){a(e.encodeURIComponent(o),t),l()},e[%22UpdateCookie%22+t]=function(e,n){var%20i=o.getElementById(%22Cookie%22+e+n+t).value;a(e,i),l()},e[%22DeleteCookie%22+t]=function(e){o.cookie.length;for(y=0,C=k.length;C%3Ey;y++)for(var%20t=0,n=h.length;n%3Et;t++){var%20i=u+(%22%22!==k[y]%3Fr+k[y]:%22%22)+(%22%22!==h[t]%3Fm+h[t]:%22%22);a(e,i)}l()},l()})(window,window.document)}();">edit</a></th>
  </tr>
  <tr>
    <td><?php display($_GET, false); ?>
    </td>
    <td><?php display($_POST); ?>
    </td>
    <td><?php display($_REQUEST); ?>
    </td>
    <td><?php display($_FILES); ?>
    </td>
    <td><?php display($_COOKIE); ?>
    </td>
  </tr>
</table>
