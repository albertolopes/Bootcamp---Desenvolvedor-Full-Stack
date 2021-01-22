import React, { Component } from "react";

import css from "../css/article.module.css";

export default class Body extends Component {
  render() {
    return (
      <div>
        <div className={css.row}>
          <title className={css.h1}>
            'Temos vivenciado um cenário de guerra', desabafa médica sobre
            internações por Covid-19 em hospital de Manaus
          </title>

          <span className={css.resume}>
            <p>
              Em vídeo, Anne Menezes relatou cenário que os profissionais da
              Saúde vêm enfrentando em hospitais da cidade por conta de um novo
              surto da Covid.
            </p>
          </span>

          <span className={css.author}>
            <p>Por alguém</p>
          </span>

          <span className={css.dateUpdate}>
            <p>12 de 2020 | ultima atualização as 20 horas</p>
          </span>

          <hr className={css.hr} />
        </div>
        <div className={css.flexRow}>
          <img
            width="650"
            src="https://agenciadenoticias.ibge.gov.br/images/agenciadenoticias/estatisticas_economicas/2020_10/PIM-BR_HOME_Rodrigo-Felix-Leal-AEN-PR.jpg"
          />
        </div>
      </div>
    );
  }
}
