using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    { 
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public Handler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync([request.Id], cancellationToken) ??
             throw new Exception ("Cannot find activity");


             _context.Remove(activity);

        await _context.SaveChangesAsync(cancellationToken);
        }
    }
};