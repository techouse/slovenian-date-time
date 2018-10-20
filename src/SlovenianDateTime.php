<?php

namespace Techouse\SlovenianDateTime;

use Carbon\Carbon;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Http\Requests\NovaRequest;

class SlovenianDateTime extends DateTime
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'slovenian-date-time';

    /**
     * Hydrate the given attribute on the model based on the incoming request.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest $request
     * @param  string                                  $requestAttribute
     * @param  object                                  $model
     * @param  string                                  $attribute
     * @return void
     * @throws \Exception
     */
    protected function fillAttributeFromRequest(NovaRequest $request, $requestAttribute, $model, $attribute)
    {
        if ($request->exists($requestAttribute) && $request[$requestAttribute]) {
            $model->{$attribute} = Carbon::parse($request[$requestAttribute]);
        }
    }
}
