<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\LeadStatus;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $perPage = $request->input('per_page', 5);
        $search = $request->input( 'search' );
        
        $validatedPerPage = filter_var($perPage, FILTER_VALIDATE_INT, [
            'options' => ['min_range' => 1],
        ]) ?: 5;

        $currentPage = $request->input( 'page', 1 );
        $cacheKey    = 'leads_' . md5( $validatedPerPage . $search . $currentPage );
        
        $leads = Cache::remember( $cacheKey, now()->addMinutes( 10 ), function () use ( $validatedPerPage, $search ) {
            return Lead::with( 'leadStatus' )
                ->when( $search, function ( $query, $search ) {
                    return $query->where( 'name', 'like', "%{$search}%" )
                        ->orWhere( 'email', 'like', "%{$search}%" );
                } )
                ->latest()
                ->paginate( $validatedPerPage );
        } );
        $statuses = LeadStatus::all();

        return Inertia::render('Leads/Index', [
            'leads' => $leads,
            'statuses' => $statuses,
            'search' => $search
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Leads/Create', [
            'statuses' => LeadStatus::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'lead_status_id' => 'required|exists:lead_statuses,id',
        ]);

        Lead::create($validated);
        $this->clearCache();
        return redirect(route('leads.index'))->with('success', 'Lead created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lead $lead): Response
    {
        return Inertia::render('Leads/Edit', [
            'lead' => $lead,
            'statuses' => LeadStatus::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lead $lead): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'lead_status_id' => 'required|exists:lead_statuses,id',
        ]);

        $lead->update($validated);
        $this->clearCache();
        return redirect(route('leads.index'))->with('success', 'Lead updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead): RedirectResponse
    {
        $lead->delete();
        $this->clearCache();
        return redirect(route('leads.index'))->with('success', 'Lead deleted successfully.');
    }
    /**
     * Clear the cache for leads.
     *
     * @return void
     */
    protected function clearCache()
    {
        Cache::flush();
    }
}
