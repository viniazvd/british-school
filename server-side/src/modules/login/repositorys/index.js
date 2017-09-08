let repositorys = {}

repositorys.authenticate = (matricula, senha, senhaDescrypt, nomeSistema) => {
  return `SELECT c.nomeusuario,e.depto,e.ver_todas_contas,c.matricula,nomesistema,a.id_perfil_sistema, c.purchasing_id
					FROM tblusers e,usuario_controle_acesso a,sistemas b,usuarios c ,perfis_acesso_sistemas d 
					WHERE a.id_sistema = b.idsistema 
					AND c.idusuario = a.id_usuario 
					AND a.id_sistema = d.id_sistema 
					AND a.id_perfil_sistema = d.idperfilsistema 
					AND c.matricula = '${matricula}'
					AND c.senha = '${senhaDescrypt}'
					AND purchasing_id > 0 
					AND purchasing_id = e.id_user 
					AND b.nomesistema = '${nomeSistema}'`
}

repositorys.existUser = (matricula, senhaDescrypt) => {
  return `SELECT matricula FROM usuarios WHERE matricula = '${matricula}' AND senha = '${senhaDescrypt}'`
}

repositorys.changepassword = (novasenha, matricula) => {
  return `UPDATE usuarios 
					SET senha = md5('${novasenha}'), primeiroacesso = 1, AttemptLogin = 0, date_last_change_pass = NOW() 
					WHERE matricula = '${matricula}'`
}

repositorys.emailForgetPassword = (matricula) => {
  return `SELECT email, senha FROM usuarios WHERE matricula = '${matricula}'`
}

module.exports = repositorys
