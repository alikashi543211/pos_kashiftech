<script>
    $('select[data-control="select2"]').select2();
    $(document).ready(function() {
        $('select[data-control="select2"]').select2();
    });
</script>
<form name="fform" enctype="multipart/form-data" id="fform" method="post" action="">
    @csrf
    <div class="card-body drawer-body" id="kt_drawer_chat_messenger_body">
        <input type="hidden" name="act" id="act" value="edit">
        <input type="hidden" name="eid" id="eid" value="{{ $row->id }}">
        <div class="scroll-y me-n5 pe-5" data-kt-element="messages" data-kt-scroll="true" data-kt-scroll-activate="true"
            data-kt-scroll-height="auto"
            data-kt-scroll-dependencies="#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer"
            data-kt-scroll-wrappers="#kt_drawer_chat_messenger_body" data-kt-scroll-offset="0px">
            <div class="mb-8 row">
                <label class="text-center col-lg-12 col-form-label fw-bold fs-6">Project Thumbnail</label>
                <div class="text-center col-lg-12">
                    <div class="image-input image-input-outline" data-kt-image-input="true"
                        style="background-image: url('')">
                        <div class="image-input-wrapper w-125px h-125px" data-type="link-link-thumbnail"
                            style="background-image: url({{ $row->project_thumbnail ?? gallery_photo('empty.png', 'avatars') }})">
                        </div>
                        <label class="shadow btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body"
                            data-kt-image-input-action="change" data-bs-toggle="tooltip" title=""
                            data-bs-original-title="Change avatar">
                            <i class="bi bi-pencil-fill fs-7"></i>
                            <input data-type="file" type="file" name="project_thumbnail" accept=".png, .jpg, .jpeg">
                            <input type="hidden" name="avatar_remove">
                        </label>
                        <span class="shadow btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body"
                            data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title=""
                            data-bs-original-title="Cancel avatar">
                            <i class="bi bi-x fs-2"></i>
                        </span>
                        <span class="shadow btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body"
                            data-kt-image-input-action="remove" data-bs-toggle="tooltip" title=""
                            data-bs-original-title="Remove avatar">
                            <i class="bi bi-x fs-2"></i>
                        </span>
                    </div>
                    <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
                </div>
            </div>
            <div class="mb-8 fv-row">
                <label class="mb-2 fs-6 fw-semibold">Start Date</label>
                <input type="date" name="start_date" id="start_date" value="{{ $row->start_date ?? '' }}"
                    class="form-control" />
            </div>
            <div class="mb-8 fv-row">
                <label class="mb-2 fs-6 fw-semibold">End Date</label>
                <input type="date" name="end_date" id="end_date" value="{{ $row->end_date ?? '' }}"
                    class="form-control" />
            </div>
            <div class="mb-8 fv-row">
                <label class="mb-2 fs-6 fw-semibold">Select Project Category</label>
                <select class="form-select form-select-solid" data-control="select2" data-hide-search="false"
                    data-placeholder=" Choose Company " name="resume_project_category_id">
                    <option selected> Choose Project Category</option>
                    @foreach ($experiences as $exp)
                        <option value="{{ $exp->id }}" @if ($row->resume_project_category_id == $exp->id) selected @endif>
                            {{ $exp->category_name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="mb-8 fv-row">
                <label class="mb-2 required fs-6 fw-semibold">Project Name</label>
                <input type="text" name="project_name" id="project_name" placeholder="Enter project name"
                    value="{{ $row->project_name ?? '' }}" class="form-control" required />
            </div>
            <div class="mb-8 fv-row">
                <label class="mb-2 fs-6 fw-semibold">Client Name</label>
                <input type="text" name="client_name" id="client_name" placeholder="Enter client name"
                    class="form-control" value="{{ $row->client_name ?? '' }}" />
            </div>
            <div class="mb-8 fv-row">
                <label class="mb-2 fs-6 fw-semibold">Website URL</label>
                <input type="text" name="website_url" id="website_url" placeholder="Enter website url"
                    class="form-control" value="{{ $row->website_url ?? '' }}" />
            </div>
            <div class="mb-8 fv-row">
                <label class="mb-2 required fs-6 fw-semibold">Project Slug</label>
                <input type="text" name="project_slug" id="project_slug" placeholder="Enter project slug"
                    value="{{ $row->project_slug ?? '' }}" class="form-control" required />
            </div>
            <div class="mb-8 fv-row">
                <label class="mb-2 fs-6 fw-semibold">Country</label>
                <input type="text" name="country" id="country" placeholder="Enter country name i.e Pakistan"
                    value="{{ $row->country ?? '' }}" class="form-control" />
            </div>
            <div class="mb-8 fv-row">
                <label class="mb-2 fs-6 fw-semibold">City</label>
                <input type="text" name="city" id="city" placeholder="Enter city name i.e Islamabad"
                    class="form-control" value="{{ $row->city ?? '' }}" />
            </div>
            <div class="mb-8 fv-row">
                <label class="mb-2 required fs-6 fw-semibold">Description</label>
                <textarea cols="30" rows="5" maxlength="500" name="description" id="description"
                    placeholder="Enter description" class="form-control" style="resize: none;">{{ $row->description ?? '' }}</textarea>
            </div>

        </div>
    </div>
    <div class="pt-4 card-footer drawer-footer" id="kt_drawer_chat_messenger_footer">
        <div class="d-flex flex-stack float-end">
            <button class="btn btn-light me-5" id="kt_drawer_chat_close" type="button"
                data-kt-element="cancel">Close</button>
            <button type="submit" class="btn btn-primary btn-save">update</button>
        </div>
    </div>


</form>
<script>
    $('select[data-control="select2"]').select2();
    $(document).ready(function() {
        $('select[data-control="select2"]').select2();
    });
</script>
