<?php

namespace App\Models\Resume;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ResumeWebsiteContactEmailsModel extends Model
{
    use SoftDeletes;
    protected $table = "resume_website_contact_emails";

    public function contactMessages(): HasMany
    {
        return $this->hasMany(ResumeWebsiteContactsModel::class, 'resume_website_contact_email_id', 'id');
    }
}
