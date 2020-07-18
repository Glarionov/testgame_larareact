<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\QuestionGrops;
use Illuminate\Support\Facades\DB;
use App\QuestionOptions;

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

    public function getQuestionsByGroupId(Request $request) {
        $id = $request['id'] ?? '';


        $qg = new QuestionGrops();

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

        $qr1 = $qg->where('id', $id)->take(5)->get();

        $questionsByGroup = $qg->leftJoin('questions', function($q) use ($id) {
            $q->on('questions.id', '=', 'question_grops.question_id')
                ->where('question_grops.group_id', '=', $id);

        })->select('question_grops.group_id as g_id', 'questions.name as question_name', 'questions.id as question_id')->take(5)->get();
//        })->select('question_grops.*')->take(5)->get();

        $qo = new QuestionOptions();
        $langId = 1;
        $result = [];
        foreach ($questionsByGroup as $questionKey => $questionValue) {
            $questionId = $questionValue['question_id'];
            $optionsForQuestion = $qo->where('question_id', $questionId)->get();
//            /*gleb*/echo '$questionId=<pre>'.print_r($questionId, true).'</pre>';//todo remove it
//            /*gleb*/echo '$optionsForQuestion=<pre>'.print_r($optionsForQuestion, true).'</pre>';//todo remove it

//            /*gleb*/echo '$questionId=<pre>'.print_r($questionId, true).'</pre>';//todo remove it
            $optionsForQuestion = $qo->leftJoin('question_options_names', function($q) use ($questionId, $langId) {
                    $q->on('question_options_names.option_id', '=', 'question_options.option_id')

//                        ->where('question_options_names.language_id', '=', $langId)
                    ;

                })->where('question_options.question_id', '=', $questionId)->select('question_options_names.name as option_name',
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
        $qr2 = DB::table('question_grops')->where('group_id', $id)->get();

        //'re' => $request['e']
        // 'poste' => request()->post('e')
        return ['questionsByGroup' => $result];
    }

    public function get(Request $request) {
        $questionId = $request['id'] ?? '';
        return ['poste' => request()->post('e'), 'post' => request()->post(),  '$questionId' => $questionId, 're' => $request['e'], 'r' => $request, 'rall' => $request->all()];
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
