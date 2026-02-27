using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class EditActivity
{
    public class Command : IRequest<string>
    {
        public required Domain.Activity Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command, string>
    { 
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public Handler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync([request.Activity.Id], cancellationToken) ??
             throw new Exception ("Cannot find activity");

            _mapper.Map(request.Activity, activity);

             await _context.SaveChangesAsync(cancellationToken);

             return null;
        }
    }
};