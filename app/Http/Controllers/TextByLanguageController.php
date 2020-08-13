<?php

namespace App\Http\Controllers;

use App\Questions;
use App\TextByLanguage;
use Illuminate\Http\Request;

class TextByLanguageController extends Controller
{
    public function changeTextById(Request $request) {

        $textId = request()->post('textId');
        $textValue = request()->post('textValue');
        $languageId = request()->post('languageId');

        $tbl = new TextByLanguage();

        $tbl->where('text_id', $textId)->where('language_id', $languageId)->update(['text' => $textValue]);
        return ['type' => 'ok'];
    }
}
