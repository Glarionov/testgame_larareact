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
        })->select('text_by_languages.text as group_name', 'group_data.id as group_id')->get();

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
        $gropDataObj->save();
        $newGroupId = $gropDataObj->id;

        return ['type' => 'ok', 'new_id' => $newGroupId];
    }

}
