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

        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync([request.Activity.Id], cancellationToken) ??
             throw new Exception ("Cannot find activity");

             activity.Title = request.Activity.Title;

             await _context.SaveChangesAsync(cancellationToken);

             return null;
        }
    }
};