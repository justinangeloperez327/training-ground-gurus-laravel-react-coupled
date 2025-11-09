<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'jobListing' => new JobResource($this->whenLoaded('jobListing')),
            'applicant' => new UserResource($this->whenLoaded('applicant')),
            'resumePath' => $this->resume_path,
            'coverLetter' => $this->cover_letter,
        ];
    }
}
