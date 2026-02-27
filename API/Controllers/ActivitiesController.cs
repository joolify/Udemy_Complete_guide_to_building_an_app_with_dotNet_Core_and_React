using System;
using System.Diagnostics;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    private readonly IMediator _mediator;

    public ActivitiesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<Domain.Activity>>> GetActivities()
    {
        var list = new GetActivityList.Query();
        return await _mediator.Send(list);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Domain.Activity>> GetActivityDetail(string id)
    {
        return await _mediator.Send(new GetActivityDetails.Query{Id = id});
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(Domain.Activity activity)
    {
        return await Mediator.Send(new CreateActivity.Command{Activity = activity});
    }
}