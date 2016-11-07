package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class RoundController extends Controller {

    def index = Action {
        Ok(views.html.round.round_index())
    }

    def manage = Action {
        Ok(views.html.round.round_manage())
    }

    def detail = Action {
        Ok(views.html.round.round_detail())
    }
}
