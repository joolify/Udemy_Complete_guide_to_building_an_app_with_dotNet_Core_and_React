using System;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

/*public class ActivitiesController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Domain.Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync();
    }
}
*/

public class ActivitiesController : BaseApiController
{
    private readonly AppDbContext _context;
    private readonly IMediator _mediator;

    public ActivitiesController(AppDbContext context, IMediator mediator)
    {
        _context = context;
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<Domain.Activity>>> GetActivities()
    {
        return await _mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Domain.Activity>> GetActivityDetail(string id)
    {
        var activity = await _context.Activities.FindAsync(id);

        if(activity == null) return NotFound();

        return activity;
    }
}