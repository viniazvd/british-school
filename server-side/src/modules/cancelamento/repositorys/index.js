let repositorys = {}

repositorys.totalPages_verTodasContas0 = (ano) => {
  return `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, departamento
          FROM blueforms
          WHERE substring(dataregistro,1,4) = ${ano}
          AND (status in(0))`
}

repositorys.totalPages_verTodasContas1 = (ano) => {
  return `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, departamento
          FROM blueforms
          WHERE substring(dataregistro,1,4) = ${ano}
          AND (status in(0))`
}

repositorys.cancelamento_verTodasContas0 = (ano, limit, offset) => {
  return `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, departamento
          FROM blueforms
          WHERE substring(dataregistro,1,4) = ${ano}
          AND (status in(0))
          LIMIT ${limit} OFFSET ${offset}`
}

repositorys.cancelamento_verTodasContas1 = (ano, limit, offset) => {
  return `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, departamento
          FROM blueforms
          WHERE substring(dataregistro,1,4) = ${ano}
          AND (status in(0))
          LIMIT ${limit} OFFSET ${offset}`
}

repositorys.updateStatusCancelado = blueform => {
  return `UPDATE blueforms 
          SET status = 10
          WHERE codigoblueform = ${blueform}`
}

repositorys.insertReason = (blueform, currentDate, idUser, reason) => {
  return `INSERT INTO cancelamento
          VALUES 
          ('', '${currentDate}', ${idUser}, ${blueform}, '${reason}')`
}

module.exports = repositorys
