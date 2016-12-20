package controllers
import play.api.mvc._
/**
  * Created by zlm on 16/12/12.
  */
class WealthController extends Controller{
    def index = Action {
        Ok(views.html.wealth.wealth_index())
    }
}
