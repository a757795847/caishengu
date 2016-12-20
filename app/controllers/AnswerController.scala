package controllers
import play.api.mvc._
/**
  * Created by zlm on 16/12/12.
  */
class AnswerController extends Controller{
    def index = Action {
        Ok(views.html.answer.answer_index())
    }
    def detail = Action {
        Ok(views.html.answer.answer_detail())
    }
}
