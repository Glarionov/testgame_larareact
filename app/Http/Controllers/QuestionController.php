<?php

namespace App\Http\Controllers;

use App\GroupData;
use App\Options;
use App\TextByLanguage;
use Illuminate\Http\Request;
use App\QuestionGrops;
use Illuminate\Support\Facades\DB;
use App\QuestionOptions;
use App\QuestionOptionsNames;
use App\Texts;
use App\Questions;
use App\QuestionGroups;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ['a' => 'b'];
    }

    public function addQuestionToGroup(Request $request) {
        //'re' => $request['e']
        // 'poste' => request()->post('e')




//        let data = {
//            questionName,
//            questionOptions,
//            languageId: this.state.currentLanguageId
//        };


        $languageId = request()->post('languageId');
         $questionOptions =  request()->post('questionOptions');

         $addedOptions = [];
         $qonids = [];

        $textObj = new Texts();
        $textObj->save();
        $textId = $textObj->id;

        $textByLanguage = new TextByLanguage();

        $textByLanguage->text_id = $textId;
        $textByLanguage->text = request()->post('questionName');;
        $textByLanguage->language_id = $languageId;
        $textByLanguage->save();

         $questionsObj = new Questions();
        $questionsObj->question_text_id = $textId;//
        $questionsObj->save();
        $questionId = $questionsObj->id;

         $questionGroupsObj = new QuestionGroups();
        $questionGroupsObj->group_id = $request['id'];
        $questionGroupsObj->question_id = $questionId;
        $questionGroupsObj->save();
        $questionGroupId = $questionGroupsObj->id;


         foreach ($questionOptions as $optionKey => $newOptionData) {
             $optionText = $newOptionData['option_name'];
             $goodAnswer = $newOptionData['good_answer'];

             $textObj = new Texts();
             $textObj->save();
             $textId = $textObj->id;

             $textByLanguage = new TextByLanguage();

             $textByLanguage->text_id = $textId;
             $textByLanguage->text = $optionText;
             $textByLanguage->language_id = $languageId;
             $textByLanguage->save();

             $optionObj = new Options();
             $optionObj->text_id = $textId;
             $optionObj->save();

             $optionId = $optionObj->id;

             $questionOptionsObj = new QuestionOptions();
             $questionOptionsObj->question_id = $questionId;
             $questionOptionsObj->option_id = $optionId;
             $questionOptionsObj->good_answer = $goodAnswer;

             $questionOptionsObj->save();
//             $questionId
//
//                 question_options
//
//             $o = new Options();
//             $o->save();
//
//             $optionId = $o->id;
//             $addedOptions [] = [
//                 'id' => $optionId,
//                 'good_answer' => $goodAnswer
//             ];
//
//             $qon = new QuestionOptionsNames();
//             $qon->name = $optionText;
//             $qon->option_id = $optionId;
//             $qon->save;
//             $qonid = $qon->id;
//
//             $qonids[] = $qonid;
         }


//        $qon->language_id = request()->post('languageId');


//        $post->title = $title;
//        $post->text_content = $textContent;
//
//        $post->img_path_maker_method_id = 1;
//        $post->img_link = $imageLink;
//        $post->author_id = $userId;


//        $qon->save();

        return ['$qonids' => $qonids, '$addedOptions'=> $addedOptions,
//            '$optionId' => $optionId,
            'poste' => request()->post(), 'gid' => $request['id']];
    }

    public function deleteQuestionEverywhere(Request $request)
    {
        $questionId = request()->post('questionId');
        $table = new QuestionGroups();
        $table->where('question_id', $questionId)->delete();
        $table = new QuestionOptions();
        $table->where('question_id', $questionId)->delete();
        $table = new Questions();
        $table->where('id', $questionId)->delete();

        return ['type' => 'ok'];
    }

    public function changeQuestionGoodAnswer(Request $request) {
        $groupId = request()->post('groupId');
        $questionId = request()->post('questionId');
        $optionId = request()->post('optionId');
        $goodAnswer = request()->post('goodAnswer');

//        $qo = new QuestionOptions;

        $qo = new QuestionOptions();
        $qo->where('question_id', $questionId)->where('option_id', $optionId)->update(['good_answer' => $goodAnswer]);
        return ['type' => 'ok'];
    }

    public function changeOptionName(Request $request) {
        $groupId = request()->post('groupId');
        $questionId = request()->post('questionId');
        $optionId = request()->post('optionId');
        $optionName = request()->post('optionName');
        $goodAnswer = request()->post('goodAnswer');

        $languageId = request()->post('languageId');

        $o = new Options();
        $textId = $o->where('id', $optionId)->get();

        $textId = $textId[0]['text_id'];
        $tbl = new TextByLanguage();

//        $qo = new QuestionOptions;

        $optionObj = new Options();
        $tbl->where('text_id', $textId)->where('language_id', $languageId)->update(['text' => $optionName]);
        return ['type' => 'ok'];
    }



    public function deleteOptionFromQuestion(Request $request) {
        $qo = new QuestionOptions();
        $questionId = request()->post('questionId');
        $optionId = request()->post('optionId');

        $qo->where('question_id', $questionId)->where('option_id', $optionId)->delete();
        return ['type' => 'ok'];
    }

    public function getQuestionsByGroupId(Request $request) {
        $id = $request['id'] ?? '';


        $qg = new QuestionGroups();

        $postsInfo = [];

//        $userId = Auth::id()?? '';
//
//        $likes = new UsersPostsLikes();
//        $dislikes = new UsersPostsDislikes();

        //echo '$userId='.$userId;
        //todo no hardcode
//        $protoQuery = $qg->leftJoin('users_posts_likes', function($q) use ($userId) {
//            $q->on('users_posts_likes.post_id', '=', 'posts.id')
//                ->where('users_posts_likes.user_id', '=', $userId);
//
//        }

        $gropDataObj = new GroupData();
        $groupData = $gropDataObj->leftJoin('text_by_languages', function ($q2) {
            $q2->on('text_by_languages.text_id', '=', 'group_data.text_id');
        })->select('text_by_languages.text as group_name', 'group_data.id as group_id')->where('group_data.id', '=', $id)->get();

        $languageId = 1;
        $questionsByGroup = $qg->leftJoin('questions', function($q) use ($id) {
            $q->on('questions.id', '=', 'question_groups.question_id')
                ->leftJoin('text_by_languages', function ($q2) use ($id) {
                    $q2->on('text_by_languages.text_id', '=', 'questions.question_text_id');
                })
                ;

        })->where('question_groups.group_id', '=', $id)->where('text_by_languages.language_id', '=', $languageId)->select('question_groups.group_id as g_id', 'text_by_languages.text as question_name', 'questions.id as question_id')->get();

        $qo = new QuestionOptions();
        $langId = 1;
        $result = [];
        foreach ($questionsByGroup as $questionKey => $questionValue) {
            $questionId = $questionValue['question_id'];
            $optionsForQuestion = $qo->where('question_id', $questionId)->get();
//            /*gleb*/echo '$questionId=<pre>'.print_r($questionId, true).'</pre>';//todo remove it
//            /*gleb*/echo '$optionsForQuestion=<pre>'.print_r($optionsForQuestion, true).'</pre>';//todo remove it

//            /*gleb*/echo '$questionId=<pre>'.print_r($questionId, true).'</pre>';//todo remove it
            $optionsForQuestion = $qo->leftJoin('options', function($q) use ($questionId, $langId) {
                    $q->on('options.id', '=', 'question_options.option_id')
                        ->leftJoin('text_by_languages', function ($q2) {
                            $q2->on('text_by_languages.text_id', '=', 'options.text_id');
                        })
//                        ->where('question_options_names.language_id', '=', $langId)
                    ;

                })->where('question_options.question_id', '=', $questionId)->where('text_by_languages.language_id', '=', $languageId)->select(
                    'text_by_languages.text as option_name',
                'question_options.id as option_id',
                'question_options.good_answer as good_answer',
                'question_options.question_id as question_id'

            )->get()->keyBy('option_id');

//            /*gleb*/echo '$optionsForQuestion=<pre>'.print_r($optionsForQuestion, true).'</pre>';//todo remove it

//            $optionsForQuestion = array_combine(array_column($optionsForQuestion, 'option_id'), $optionsForQuestion);
//            /*gleb*/echo '22222222=<pre>'.print_r($optionsForQuestion, true).'</pre>';//todo remove it
//            $result[$questionId] = [
            $result[] = [
                'question_name' => $questionValue['question_name'],
                'options' => $optionsForQuestion,
                'question_id' => $questionId
                ];
        }

        //'re' => $request['e']
        // 'poste' => request()->post('e')
        return ['questionsByGroup' => $result, 'groupData' => $groupData];
    }

    public function get(Request $request) {
        $questionId = $request['id'] ?? '';
        return [ 'poste' => request()->post('e'), 'post' => request()->post(),  '$questionId' => $questionId, 're' => $request['e'], 'r' => $request, 'rall' => $request->all()];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
