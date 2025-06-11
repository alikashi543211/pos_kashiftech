@if ($result)
    @foreach ($result as $row)
        <div class="col-md-3">
            <!--begin::Card-->
            <div class="card card-flush h-md-100">
                <!--begin::Card header-->
                <div class="card-header">
                    <!--begin::Card title-->
                    <div class="card-title">
                        <h2>{{ $row->module_name }}</h2>
                    </div>
                    <!--end::Card title-->
                </div>
                <!--end::Card header-->
                <!--begin::Card body-->
                <div class="card-body pt-1">
                    <!--begin::Users-->
                    <div class="fw-bolder text-gray-600 mb-5">Category: {{ $row->category->category_name }}

                    </div>
                    <div class="fw-bolder text-gray-600 mb-5">Slug: {{ $row->route }}

                    </div>
                    <!--end::Users-->
                    <!--begin::Permissions-->
                    <div class="d-flex flex-column text-gray-600">
                        <div class="d-flex align-items-center py-2">
                            <strong>Assgined To:</strong>
                        </div>
                        @if ($row->roles)
                            @foreach ($row->roles->take(4) as $roles)
                                <div class="d-flex align-items-center py-2">
                                    <span class="bullet bg-primary me-3"></span>{{ $roles->role->role_name }}
                                </div>
                            @endforeach
                        @endif
                    </div>
                    <!--end::Permissions-->
                </div>
                <!--end::Card body-->
                <!--begin::Card footer-->
                <div class="card-footer flex-wrap pt-0">
                    <a href="javascript:void(0)">
                        <button type="button" data-id="{{ $row->ID }}"
                            class="btn btn-light btn-active-light-primary btn-edit my-1">Edit
                            Module</button>
                    </a>

                    <button type="button" class="btn btn-light btn-active-light-primary my-1 btn-del"
                        data-id="{{ $row->ID }}">Delete Module</button>

                </div>
                <!--end::Card footer-->
            </div>
            <!--end::Card-->
        </div>
    @endforeach
@endif
