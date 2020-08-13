<?php

namespace App\Http\Controllers;

use App\TextByLanguage;
use App\Texts;
use Illuminate\Http\Request;
use App\GroupData;

class GroupDataController extends Controller
{
    public function getAll(Request $request) {
        $gropDataObj = new GroupData();
        $groupData = $gropDataObj->leftJoin('text_by_languages', function ($q2) {
            $q2->on('text_by_languages.text_id', '=', 'group_data.text_id');
        })->select('text_by_languages.text as group_name', 'group_data.id as group_id',
        'group_data.text_id as text_id'
        )->get();

        return ['group_data' => $groupData];
    }

    public function getGroupRecursion($id) {

        $gropDataObj = new GroupData();
        $groupData = $gropDataObj->leftJoin('text_by_languages', function ($q2) {
            $q2->on('text_by_languages.text_id', '=', 'group_data.text_id');
        })->where('parent_id', $id)->select('text_by_languages.text as group_name', 'group_data.id as group_id',
            'group_data.text_id as text_id'
        )->get()->keyBy('group_id');

        foreach ($groupData as $groupId => $group) {
            $groupData[$groupId]['subgroups'] = $this->getGroupRecursion($groupId);
        }
        return $groupData;
    }

    public function getAllTree(Request $request) {
        $groupData = $this->getGroupRecursion(0);
//        $gropDataObj = new GroupData();
//        $groupData = $gropDataObj->leftJoin('text_by_languages', function ($q2) {
//            $q2->on('text_by_languages.text_id', '=', 'group_data.text_id');
//        })->where('parent_id', 0)->select('text_by_languages.text as group_name', 'group_data.id as group_id',
//            'group_data.text_id as text_id'
//        )->get()->keyBy('group_id');
////        )->get();
//
////        /*gleb*/echo '$groupData=<pre>'.print_r($groupData, true).'</pre>';//todo remove it
//        foreach ($groupData as $groupId => $group) {
//            $subGroup = $gropDataObj->leftJoin('text_by_languages', function ($q2) {
//                $q2->on('text_by_languages.text_id', '=', 'group_data.text_id');
//            })->where('parent_id', $groupId)->select('text_by_languages.text as group_name', 'group_data.id as group_id',
//                'group_data.text_id as text_id'
//            )->get()->keyBy('group_id');
//
//            $groupData['subgroups'] = $subGroup;
//        }

        return ['group_data' => $groupData];
    }

    public function addGroup(Request $request) {
        $textObj = new Texts();
        $textObj->save();
        $textId = $textObj->id;

        $textByLanguage = new TextByLanguage();
        $textByLanguage->text_id = $textId;
        $textByLanguage->text = request()->post('groupName');;
        $textByLanguage->language_id = request()->post('languageId');

        $textByLanguage->save();


        $gropDataObj = new GroupData();
        $gropDataObj->text_id = $textId;
        $gropDataObj->parent_id = request()->post('parentId');
        $gropDataObj->save();
        $newGroupId = $gropDataObj->id;

        return ['type' => 'ok', 'new_id' => $newGroupId];
    }

    public function deleteGroup(Request $request)
    {
        $gropDataObj = new GroupData();
        $groupId = request()->post('groupId');

        $gropDataObj->where('id', $groupId)->delete();
        return ['type' => 'ok'];
    }

    public function changeGroupName(Request $request)
    {
        //todo cake приложение
        $gropDataObj = new GroupData();
        $groupId = request()->post('groupId');
        $languageId = request()->post('languageId');
        $newName = request()->post('newName');

//        $gropDataObj->where('id', $groupId)->delete();

//        /*gleb*/echo '$gropDataObj=<pre>'.print_r($gropDataObj, true).'</pre>';//todo remove it

        $textId = $gropDataObj->where('id', $groupId)->get();
        $textId = $textId[0]['text_id'];
//
        $tbl = new TextByLanguage();
//
        $tbl->where('text_id', $textId)->where('language_id', $languageId)->update(['text' => $newName]);

        return ['type' => 'ok'];

        /*
        $questionId = request()->post('questionId');
        $questionName = request()->post('questionName');

        $languageId = request()->post('languageId');

        $o = new Questions();
        $textId = $o->where('id', $questionId)->get();
        $textId = $textId[0]['question_text_id'];
        $tbl = new TextByLanguage();

        $tbl->where('text_id', $textId)->where('language_id', $languageId)->update(['text' => $questionName]);
        return ['type' => 'ok'];
         */
    }



}
