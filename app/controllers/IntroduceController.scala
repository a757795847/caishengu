package controllers
import play.api.mvc._
/**
  * Created by zlm on 16/10/28.
  */
class IntroduceController extends Controller {
    def index = Action{
        Ok(views.html.introduce.introduce_index())
    }
    def add = Action{
        Ok(views.html.introduce.introduce_add())
    }
}
