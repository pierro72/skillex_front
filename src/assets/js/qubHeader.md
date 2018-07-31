/*! qubHeader 2018-07-13 */ function initQubHeader(a,b,c,d,e,f,g,h,j,k){function l(){return'
<div class="skin-blue qubHeader">
    <a class="logo" href=""><img style="width:30px;height:30px;margin-right:10px" src="a" /><span class="logo-lg" id="infoAppName">AppName</span></a>
    <nav class="navbar navbar-static-top" role="navigation"><a href="#" class="sidebar-toggle" data-toggle="dropdown" role="button"><span class="fa fa-th"></span></a>
        <ul class="dropdown-menu">
            <li class="app-header">
                <p class="pull-left">Applications</p>
            </li>
            <li class="app-body">
                <ul id="appList" class="app-list"></ul>
            </li>
        </ul>
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <li class="dropdown messages-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <i class="fa fa-envelope-o"></i> </a>
                    <ul class="dropdown-menu">
                        <li>
                            <ul class="menu">
                                <li>
                                    <a href="mailto:support.cube@sodifrance.fr" data-toggle="tooltip" data-placement="bottom" title="Contacter le support Cube">
                                        <div class="pull-left"> <i class="fa fa-2x fa-wrench"></i> </div>
                                        <h4>Equipe CDS java </h4>
                                        <p>support.cube@sodifrance.fr</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="https://conferencecloud-assets.s3.amazonaws.com/default_avatar.png" class="user-image avatar-content" alt="User Image"><span class="hidden-xs infoUserName"> PrenomNomUser !</span></a>
                    <ul class="dropdown-menu">
                        <li class="user-header"><img src="https://conferencecloud-assets.s3.amazonaws.com/default_avatar.png" class="img-circle avatar-content" alt="User Image">
                            <p><span class="infoUserName">NomPrenomUser</span></p>
                            <p><span class="infoUserRole">UserRole</span></p>
                        </li>
                        <li class="user-footer">
                            <div class="pull-right"><a href="#" class="btn btn-default btn-flat logOut">Déconnexion</a></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</div>'}function m(a,b,c,d,e,f,g,h,i){$("
<form>",{action:a,method:"post"}).append(n("apiKey",b),n("user",c),n("id_user",d),n("admin",e),n("team",f),n("id_team",g),n("role",h),n("appName",i)).appendTo($("body")).submit()}function n(a,b){return $("
    <input>",{name:a,value:b,type:"hidden"})}function o(a,b,c,d,e,f,g,h,i,j){this.appNom=a,this.user=b,this.userId=c,this.admin=d,this.team=e,this.teamId=f,this.role=g,this.apiKey=h,this.teamData,this.userData,this.userImg,this.qubAdress=i}var p,q,r;$("body").prepend(l()),$.ajax({method:"GET",datatype:"json",url:j+"/api/team/"+f,data:{apikey:h}}).done(function(a){p=a}),$.ajax({method:"GET",dataType:"json",url:j+"/api/user/"+c,data:{apikey:h}}).done(function(a){q=a}),$.ajax({method:"GET",dataType:"json",url:k+"/img/"+c}).done(function(a){r=a}),$(document).ajaxStop(function(){var i=new o(a,b,c,d,e,f,g,h,j);i.setTeamData(p),i.setUserData(q),i.setUserImg(r),i.fillHeader()}),o.prototype={constructor:o,buildHeader:function(){},fillHeader:function(){var a,b=this,c=!1;for(i in this.userData.equipes_role)"pilote"===this.userData.equipes_role[i].role&&(c=!0);a=this.userData.equipes_role.length>1,(this.admin||c)&&$(".user-footer").append('
    <div class="pull-left"><a href="#" class="btn btn-default btn-flat toIHNI" data-toggle="tooltip" data-placement="bottom" title="Administration"><i class="fa fa-cogs"></i></a></div>'),a&&$(".user-footer").append('
    <div class="pull-left"><a href="#" class="btn btn-default btn-flat" id="btnChTeam" data-toggle="tooltip" data-placement="bottom" title="Retour aux choix déquipe"><i class="fa fa-users"></i></a></div>'),$("a.toIHNI").attr("href",this.qubAdress+"/qub/ihni/user/"),$("a.logOut").attr("href",this.qubAdress+"/logout"),$("#infoAppName").html(this.appNom),$(".infoUserName").html(this.user),$("#btnChTeam").attr("href",this.qubAdress+"/qub/team_table"),$(".infoUserRole").html(this.role),$(".avatar-content").attr("src","data:image/*;base64,"+this.userImg.content),$(".qubHeader .logo").attr("href",this.qubAdress+"/qub/team_table"),$(".qubHeader .logo>img").attr("src",this.qubAdress+"/qubheader/img/cube-m-32.png");var d=this.teamData.info.modules;$("#appList").html("");for(var e in d)if(d[e].nom.toUpperCase()!==this.appNom.toUpperCase()){var f=d[e].url,g=$("
    <li appUrl='"+f+"'>
        <button type='button' class='btn btn-primary btn-flat'>"+d[e].nom+"</button>
    </li>");$("#appList").append(g),g.click(function(){m($(this).attr("appUrl"),b.apiKey,b.user,b.userId,b.admin,b.team,b.teamId,b.role,b.appNom)})}},setTeamData:function(a){this.teamData=a},setUserData:function(a){this.userData=a},setUserImg:function(a){this.userImg=a}}}
