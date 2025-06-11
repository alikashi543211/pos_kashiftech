<?php

namespace App\Models\Resume;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;

class ResumeAboutSectionsModel extends Model
{
    protected $table = 'resume_about_sections';

    public function getDisplayPictureAttribute($value)
    {
        if (isset($value)) {
            if (File::exists(env('BASE_MEDIA_PATH') . $value)) {
                return env('BASE_MEDIA_URL') . $value;
            }
        }
        return url('assets/images/default_user.png');
    }
}
